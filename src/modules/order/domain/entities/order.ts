import { OrderId } from "../value-objects/order-id";
import { CustomerId } from "../value-objects/customer-id";
import { OrderStatus } from "../value-objects/order-status";
import { OrderItem } from "./order-item";
import { EmptyOrderError } from "../errors/empty-order.error";
import { InvalidOrderStateError } from "../errors/invalid-order-state.error";
import { Price } from '../../../shared/domain/value-objects/price';

export class Order {
  private status: OrderStatus;

  private constructor(
    private readonly id: OrderId,
    private readonly customerId: CustomerId,
    private readonly items: OrderItem[],
    private readonly totalPrice: Price,
    status?: OrderStatus
  ) {
    this.status = status ?? OrderStatus.CREATED;
  }

  static create(
    customerId: CustomerId,
    items: OrderItem[],
    totalPrice: Price,
    id?: OrderId
  ): Order {
    if (items.length === 0) {
      throw new EmptyOrderError();
    }

    return new Order(
      id ?? OrderId.create(),
      customerId,
      items,
      totalPrice
    );
  }

  complete(): void {
    if (this.status !== OrderStatus.CREATED) {
      throw new InvalidOrderStateError();
    }
    this.status = OrderStatus.COMPLETED;
  }

  getId(): OrderId {
    return this.id;
  }

  getItems(): OrderItem[] {
    return [...this.items];
  }

  getTotalPrice(): Price {
    return this.totalPrice;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getCustomerId(): CustomerId {
    return this.customerId;
  }
}
