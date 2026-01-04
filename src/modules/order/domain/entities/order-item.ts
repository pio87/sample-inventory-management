import { Price } from "../value-objects/price";

export class OrderItem {
  private constructor(
    private readonly productId: string,
    private readonly quantity: number,
    private readonly unitPrice: Price
  ) {}

  static create(
    productId: string,
    quantity: number,
    unitPrice: Price
  ): OrderItem {
    if (quantity <= 0) {
      throw new Error("Quantity must be positive");
    }

    return new OrderItem(productId, quantity, unitPrice);
  }

  getTotalPrice(): Price {
    return Price.create(this.unitPrice.getAmount() * this.quantity);
  }

  getProductId(): string {
    return this.productId;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getUnitPrice(): Price {
    return this.unitPrice;
  }
}
