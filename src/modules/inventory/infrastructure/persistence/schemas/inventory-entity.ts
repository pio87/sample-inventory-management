import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("inventory")
export class InventoryEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column("uuid", { name: "product_id" })
  productId!: string;

  @Column("int")
  quantity!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
