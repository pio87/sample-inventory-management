import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { OrderEntity } from "./order-entity";

@Entity("order_items")
export class OrderItemEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid", { name: "product_id" })
  productId!: string;

  @Column("int")
  quantity!: number;

  @Column("numeric", { precision: 10, scale: 2, name: "unit_price" })
  unitPrice!: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  order!: OrderEntity;
}
