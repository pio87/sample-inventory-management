export class InvalidQuantityError extends Error {
  constructor() {
    super("Quantity must be a positive integer");
  }
}
