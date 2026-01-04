export class Price {
  private constructor(private readonly amount: number) {}

  static create(amount: number): Price {
    if (amount < 0) {
      throw new Error("Price amount cannot be negative");
    }
    return new Price(amount);
  }

  add(other: Price): Price {
    return new Price(this.amount + other.amount);
  }

  getAmount(): number {
    return this.amount;
  }
}
