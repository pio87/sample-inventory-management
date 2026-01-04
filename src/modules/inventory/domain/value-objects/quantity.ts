import { InvalidQuantityError } from "../errors/invalid-quantity.error";

export class Quantity {
  private constructor(private readonly value: number) {}

  static create(value: number): Quantity {
    if (!Number.isInteger(value) || value <= 0) {
      throw new InvalidQuantityError();
    }
    return new Quantity(value);
  }

  getValue(): number {
    return this.value;
  }
}
