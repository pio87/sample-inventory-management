import cors from 'cors';
import express from 'express';
import { DataSource } from "typeorm";
import helmet from 'helmet';
import morgan from 'morgan';
import * as middlewares from './middlewares.js';
import { productRoutes } from './modules/product/infrastructure/http/product.routes';
import { orderRoutes } from './modules/order/infrastructure/http/order.routes';
import { inventoryRoutes } from './modules/inventory/infrastructure/http/inventory.routes';

export async function createApp(dataSource: DataSource) {

  const app = express();

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use("/", productRoutes(dataSource));
  app.use("/", orderRoutes(dataSource));
  app.use("/", inventoryRoutes(dataSource));

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  return app;
}
