import { DataSource } from "typeorm";
import { CreateOrderCommand } from "../commands/create-order.command";
import { PricingService } from "../../../pricing/application/PricingService";
import { RepositoryFactory } from "../../../shared/persistance/repository-factory";
import { Order, OrderItem, CustomerId, Price } from '../../domain';
import { ProductId } from "../../../inventory/domain/value-objects/product-id";
import { Quantity } from "../../../inventory/domain/value-objects/quantity";
import { NotFoundError } from '../../../shared/errors/not-found.error';

export class CreateOrderHandler {
  constructor(
    private readonly dataSource: DataSource,
    private readonly pricingService: PricingService
  ) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const inventoryRepo = RepositoryFactory.inventory(manager);
      const orderRepo = RepositoryFactory.order(manager);

      /** Pricing */
      const pricingResult = await this.pricingService.calculate(
        command.customerId,
        command.items
      );

      /** Inventory check + decrease stock */
      for (const item of command.items) {
        const inventoryItem = await inventoryRepo.findByProductId(
          ProductId.create(item.productId)
        );

        if (!inventoryItem) {
          throw new NotFoundError(`Inventory item for product ID ${item.productId} not found`);
        }

        inventoryItem.sell(Quantity.create(item.quantity));
        await inventoryRepo.save(inventoryItem);
      }

      /** Build Order aggregate */
      const orderItems: OrderItem[] = pricingResult.map((pricedItem) => {
        const quantity = command.items.find(
          (i) => i.productId === pricedItem.productId
        )!.quantity;

        return OrderItem.create(
          pricedItem.productId,
          quantity,
          pricedItem.unitPrice
        );
      });

      const totalPrice = orderItems.reduce(
        (acc, item) => acc.add(item.getTotalPrice()),
        Price.create(0)
      );

      const order = Order.create(
        CustomerId.create(command.customerId),
        orderItems,
        totalPrice
      );

      /** Persist Order */
      await orderRepo.save(order);
    });
  }
}
