import { InventoryRepository } from "../../domain/repositories/inventory.repository";
import { ProductId } from "../../domain/value-objects/product-id";
import { Quantity } from "../../domain/value-objects/quantity";
import { InventoryItem } from "../../domain/entities/inventory-item";
import { RestockProductCommand } from '../commands/restock-product.command';

export class RestockProductHandler {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async execute(command: RestockProductCommand): Promise<void> {
    const productId = ProductId.create(command.productId);
    const quantity = Quantity.create(command.quantity);

    const item = await this.inventoryRepository.findByProductId(productId);

    if (!item) {
      const newItem = InventoryItem.create(productId, quantity);
      await this.inventoryRepository.save(newItem);
      return;
    }

    item.restock(quantity);
    await this.inventoryRepository.save(item);
  }
}
