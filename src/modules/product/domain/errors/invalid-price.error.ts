export class InvalidPriceError extends Error {
  constructor() {
    super("Product price must be greater than zero");
  }
}
