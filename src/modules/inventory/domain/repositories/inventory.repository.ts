import { InventoryItem } from "../entities/inventory-item";
import { ProductId } from "../value-objects/product-id";

export interface InventoryRepository {
  findByProductId(productId: ProductId): Promise<InventoryItem | null>;
  save(item: InventoryItem): Promise<void>;
}
