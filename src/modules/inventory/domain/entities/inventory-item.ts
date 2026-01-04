import { InventoryId } from "../value-objects/inventory-id";
import { ProductId } from "../value-objects/product-id";
import { Quantity } from "../value-objects/quantity";
import { InsufficientStockError } from "../errors/insufficient-stock.error";

export class InventoryItem {
  private constructor(
    private readonly id: InventoryId,
    private readonly productId: ProductId,
    private quantity: number
  ) {}

  static create(
    productId: ProductId,
    initialQuantity: Quantity,
    id?: InventoryId
  ): InventoryItem {
    return new InventoryItem(
      id ?? InventoryId.create(),
      productId,
      initialQuantity.getValue()
    );
  }

  getId(): InventoryId {
    return this.id;
  }

  getProductId(): ProductId {
    return this.productId;
  }

  getQuantity(): number {
    return this.quantity;
  }

  restock(quantity: Quantity): void {
    this.quantity += quantity.getValue();
  }

  sell(quantity: Quantity): void {
    if (this.quantity - quantity.getValue() < 0) {
      throw new InsufficientStockError();
    }
    this.quantity -= quantity.getValue();
  }
}
