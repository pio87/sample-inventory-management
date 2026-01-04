export class Price {
  private constructor(private readonly value: number) {}

  static create(value: number): Price {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    return new Price(value);
  }

  applyDiscount(percent: number): Price {
    return new Price(this.value * (1 - percent));
  }

  getValue(): number {
    return this.value;
  }
}
