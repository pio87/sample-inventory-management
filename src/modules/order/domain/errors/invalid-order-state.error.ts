export class InvalidOrderStateError extends Error {
  constructor() {
    super("Invalid order state transition");
  }
}
