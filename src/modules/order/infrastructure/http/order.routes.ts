import { Router } from "express";
import { OrderController } from "./order.controller";
import { CreateOrderHandler } from "../../application/handlers/create-order.handler";
import { PricingServiceImpl } from "../../../pricing/infrastructure/pricing-service.impl";
import { createOrderValidator } from '../validators/create-order.validator';
import { DataSource } from 'typeorm';

export const orderRoutes = (dataSource: DataSource) => {
  const router = Router();

  const pricingService = new PricingServiceImpl();
  const createOrderHandler = new CreateOrderHandler(
    dataSource,
    pricingService
  );

  const orderController = new OrderController(createOrderHandler);

  router.post('/orders',
    createOrderValidator,
    orderController.createOrder.bind(orderController)
  );

  return router;
}
