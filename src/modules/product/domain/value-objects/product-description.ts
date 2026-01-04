import { InvalidProductDescriptionError } from "../errors/invalid-product-description.error";

export class ProductDescription {
  private constructor(private readonly value: string) {}

  static create(value: string): ProductDescription {
    if (!value || value.length > 50) {
      throw new InvalidProductDescriptionError();
    }
    return new ProductDescription(value);
  }

  getValue(): string {
    return this.value;
  }
}
