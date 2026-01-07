import { DataSource } from 'typeorm';
import { ProductEntity } from '../modules/product/infrastructure/persistence/schemas/product-entity';
import { InventoryEntity } from '../modules/inventory/infrastructure/persistence/schemas/inventory-entity';
import { OrderEntity } from '../modules/order/infrastructure/persistence/schemas/order-entity';
import { OrderItemEntity } from '../modules/order/infrastructure/persistence/schemas/order-item-entity';

export const TestDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: true,
  logging: false,
  dropSchema: true,

  entities: [
    ProductEntity,
    InventoryEntity,
    OrderEntity,
    OrderItemEntity
  ],

  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
