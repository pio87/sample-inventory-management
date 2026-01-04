import { Order } from "../entities/order";
import { OrderId } from "../value-objects/order-id";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: OrderId): Promise<Order | null>;
}
