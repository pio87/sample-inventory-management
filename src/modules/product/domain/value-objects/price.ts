import { InvalidPriceError } from "../errors/invalid-price.error";

export class Price {
  private constructor(private readonly amount: number) {}

  static create(amount: number): Price {
    if (amount <= 0) {
      throw new InvalidPriceError();
    }
    return new Price(amount);
  }

  getAmount(): number {
    return this.amount;
  }
}
