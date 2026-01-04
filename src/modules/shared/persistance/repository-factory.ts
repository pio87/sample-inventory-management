import { EntityManager } from "typeorm";
import { InventoryRepositoryTypeORM } from "../../inventory/infrastructure/persistence/repositories/inventory.repository.typeorm";
import { InventoryEntity } from "../../inventory/infrastructure/persistence/schemas/inventory-entity";
import { OrderRepositoryTypeORM } from "../../order/infrastructure/persistence/repositories/order.repository-typeorm";
import { OrderEntity } from "../../order/infrastructure/persistence/schemas/order-entity";
import {
  ProductRepositoryTypeORM
} from '../../product/infrastructure/persistence/repositories/product.repository-typeorm';
import { ProductEntity } from '../../product/infrastructure/persistence/schemas/product-entity';

export class RepositoryFactory {
  static inventory(manager: EntityManager) {
    return new InventoryRepositoryTypeORM(
      manager.getRepository(InventoryEntity)
    );
  }

  static order(manager: EntityManager) {
    return new OrderRepositoryTypeORM(
      manager.getRepository(OrderEntity)
    );
  }

  static product(manager: EntityManager) {
    return new ProductRepositoryTypeORM(
      manager.getRepository(ProductEntity)
    );
  }
}
