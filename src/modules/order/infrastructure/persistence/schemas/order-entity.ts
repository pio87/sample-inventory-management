import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { OrderItemEntity } from "./order-item-entity";

@Entity("orders")
export class OrderEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid", { name: "customer_id" })
  customerId!: string;

  @Column("varchar", { length: 20 })
  status!: string;

  @Column("numeric", { precision: 10, scale: 2, name: "total_price" })
  totalPrice!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItemEntity[];
}
