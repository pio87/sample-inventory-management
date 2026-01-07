export class InvalidProductNameError extends Error {
  constructor() {
    super("Product name is required and must be <= 50 characters");
  }
}
