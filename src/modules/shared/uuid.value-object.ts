import { v4 } from "uuid";

export class UuidValueObject {
  protected constructor(private readonly value: string) {}

  static create(value?: string): UuidValueObject {
    return new UuidValueObject(value ?? v4());
  }

  getValue(): string {
    return this.value;
  }
}
