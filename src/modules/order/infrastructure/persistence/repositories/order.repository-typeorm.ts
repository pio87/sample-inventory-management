import { Repository } from "typeorm";
import { Order, OrderId, OrderRepository } from "../../../domain";
import { OrderEntity } from "../schemas/order-entity";
import { OrderMapper } from "../mappers/order.mapper";

export class OrderRepositoryTypeORM implements OrderRepository {
  constructor(private readonly repo: Repository<OrderEntity>) {}

  async save(order: Order): Promise<void> {
    const entity = OrderMapper.toPersistence(order);
    await this.repo.save(entity);
  }

  async findById(id: OrderId): Promise<Order | null> {
    const entity = await this.repo.findOne({
      where: { id: id.getValue() },
      relations: ["items"],
    });

    return entity ? OrderMapper.toDomain(entity) : null;
  }
}
