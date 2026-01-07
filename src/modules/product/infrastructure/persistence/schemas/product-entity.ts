import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("varchar", { length: 50 })
  name!: string;

  @Column("varchar", { length: 50 })
  description!: string;

  @Column("numeric", { precision: 10, scale: 2 })
  price!: number;

  @Column("varchar", { length: 30 })
  category!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
