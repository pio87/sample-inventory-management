export class InvalidProductDescriptionError extends Error {
  constructor() {
    super("Product description is required and must be <= 50 characters");
  }
}
