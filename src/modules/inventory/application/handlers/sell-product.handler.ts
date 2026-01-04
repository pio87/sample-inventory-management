import { InventoryRepository } from "../../domain/repositories/inventory.repository";
import { ProductId } from "../../domain/value-objects/product-id";
import { Quantity } from "../../domain/value-objects/quantity";
import { SellProductCommand } from '../commands/sell-product.command';
import { NotFoundError } from '../../../shared/errors/not-found.error';

export class SellProductHandler {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(command: SellProductCommand): Promise<void> {
    const productId = ProductId.create(command.productId);
    const quantity = Quantity.create(command.quantity);

    const item = await this.inventoryRepository.findByProductId(productId);
    if (!item) {
      throw new NotFoundError();
    }

    item.sell(quantity);
    await this.inventoryRepository.save(item);
  }
}
