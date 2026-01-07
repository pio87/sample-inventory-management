import { DataSource } from 'typeorm';
import { CreateOrderCommand } from '../commands/create-order.command';
import { PricingService } from '../../../pricing/application/pricing.service';
import { RepositoryFactory } from '../../../shared/persistance/repository-factory';
import { CustomerId, Order, OrderItem } from '../../domain';
import { ProductId } from '../../../inventory/domain/value-objects/product-id';
import { Quantity } from '../../../inventory/domain/value-objects/quantity';
import { NotFoundError } from '../../../shared/errors/not-found.error';
import { Price } from '../../../shared/domain/value-objects/price';
import { Region } from '../../../shared/types';

export class CreateOrderHandler {
  constructor(
    private readonly dataSource: DataSource,
    private readonly pricingService: PricingService
  ) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const productRepo = RepositoryFactory.product(manager);
      const inventoryRepo = RepositoryFactory.inventory(manager);
      const orderRepo = RepositoryFactory.order(manager);

      let subtotal = Price.zero();
      const orderItems: OrderItem[] = [];
      let allItemsQuantity = 0;

      /** Inventory check + decrease stock */
      for (const item of command.items) {
        const productId = ProductId.create(item.productId);

        const inventoryItem = await inventoryRepo.findByProductId(productId);

        if (!inventoryItem) {
          throw new NotFoundError(`Inventory item for product ID ${item.productId} not found`);
        }

        inventoryItem.sell(Quantity.create(item.quantity));
        await inventoryRepo.save(inventoryItem);

        const product = await productRepo.findById(productId);
        if (!product) {
          throw new NotFoundError(`Product with ID ${item.productId} not found`);
        }
        const newOrderItem = OrderItem.create(
          product.getId().getValue(),
          item.quantity,
          product.getPrice()
        );
        orderItems.push(newOrderItem);
        subtotal = subtotal.add(newOrderItem.getTotalPrice());
        allItemsQuantity += item.quantity;
      }

      const totalPrice = this.pricingService.calculateTotal(subtotal, {
        itemCount: allItemsQuantity,
        // TODO: Get region from customer data
        region: command.region || Region.EU,
        subtotal: subtotal,
        date: new Date()
      });

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
