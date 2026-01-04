import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { InventoryRepositoryTypeORM } from '../persistence/repositories/inventory.repository.typeorm';
import { InventoryEntity } from '../persistence/schemas/inventory-entity';
import { RestockProductHandler } from '../../application/handlers/restock-product.handler';
import { SellProductHandler } from '../../application/handlers/sell-product.handler';
import { restockRequestValidator } from '../validators/restock-request.validator';
import { sellRequestValidator } from '../validators/sell-request.validator';
import { DataSource } from 'typeorm';

export const inventoryRoutes = (dataSource: DataSource) => {

  const router = Router();

  const inventoryRepository = new InventoryRepositoryTypeORM(
    dataSource.getRepository(InventoryEntity)
  );

  const restockHandler = new RestockProductHandler(inventoryRepository);
  const sellHandler = new SellProductHandler(inventoryRepository);

  const controller = new InventoryController(
    restockHandler,
    sellHandler
  );

  router.post(
    "/products/:id/restock",
    restockRequestValidator,
    controller.restock.bind(controller)
  );

  router.post(
    "/products/:id/sell",
    sellRequestValidator,
    controller.sell.bind(controller)
  );

  return router;
}
