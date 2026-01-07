import { InventoryItem } from "../../../domain/entities/inventory-item";
import { InventoryEntity } from "../schemas/inventory-entity";
import { InventoryId } from "../../../domain/value-objects/inventory-id";
import { ProductId } from "../../../domain/value-objects/product-id";
import { Quantity } from "../../../domain/value-objects/quantity";

export class InventoryMapper {
  static toPersistence(item: InventoryItem): InventoryEntity {
    const entity = new InventoryEntity();
    entity.id = item.getId().getValue();
    entity.productId = item.getProductId().getValue();
    entity.quantity = item.getQuantity();
    return entity;
  }

  static toDomain(entity: InventoryEntity): InventoryItem {
    return InventoryItem.create(
      ProductId.create(entity.productId),
      Quantity.create(entity.quantity),
      InventoryId.create(entity.id)
    );
  }
}
