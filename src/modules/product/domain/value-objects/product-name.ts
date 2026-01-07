import { InvalidProductNameError } from "../errors/invalid-product-name.error";

export class ProductName {
  private constructor(private readonly value: string) {}

  static create(value: string): ProductName {
    if (!value || value.length > 50) {
      throw new InvalidProductNameError();
    }
    return new ProductName(value);
  }

  getValue(): string {
    return this.value;
  }
}
