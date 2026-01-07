import { CustomerId, Order, OrderId, OrderItem } from '../../../domain';
import { OrderEntity } from '../schemas/order-entity';
import { OrderItemEntity } from '../schemas/order-item-entity';
import { randomUUID } from 'crypto';
import { Price } from '../../../../shared/domain/value-objects/price';

export class OrderMapper {
  static toPersistence(order: Order): OrderEntity {
    const entity = new OrderEntity();
    entity.id = order.getId().getValue();
    entity.customerId = order.getCustomerId().getValue();
    entity.status = order.getStatus();
    entity.totalPrice = order.getTotalPrice().getValue();

    entity.items = order.getItems().map((item) => {
      const itemEntity = new OrderItemEntity();
      itemEntity.id = randomUUID();
      itemEntity.productId = item.getProductId();
      itemEntity.quantity = item.getQuantity();
      itemEntity.unitPrice = item.getUnitPrice().getValue();
      itemEntity.order = entity;
      return itemEntity;
    });

    return entity;
  }

  static toDomain(entity: OrderEntity): Order {
    const items = entity.items.map((item) =>
      OrderItem.create(
        item.productId,
        item.quantity,
        Price.create(Number(item.unitPrice))
      )
    );

    return Order.create(
      CustomerId.create(entity.customerId),
      items,
      Price.create(Number(entity.totalPrice)),
      OrderId.create(entity.id)
    );
  }
}
