export class Price {
  private constructor(private readonly value: number) {}

  static create(value: number): Price {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    return new Price(value);
  }

  static zero(): Price {
    return new Price(0);
  }

  add(other: Price): Price {
    return new Price(this.value + other.value);
  }

  increaseByPercentage(rate: number): Price {
    return new Price(this.value * (1 + rate));
  }

  decreaseByPercentage(rate: number): Price {
    return new Price(this.value * (1 - rate));
  }

  isLowerThan(other: Price): boolean {
    return this.value < other.value;
  }

  getValue(): number {
    return this.value;
  }
}
