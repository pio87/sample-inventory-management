import { Router } from "express";
import { OrderController } from "./order.controller";
import { CreateOrderHandler } from "../../application/handlers/create-order.handler";
import { PricingServiceImpl } from "../../../pricing/infrastructure/pricing-service.impl";
import { createOrderValidator } from '../validators/create-order.validator';
import { DataSource } from 'typeorm';
import { DefaultPricingStrategyFactory } from '../../../pricing/domain/strategies/pricing-strategy-factory';
import { BestDiscountSelector } from '../../../pricing/infrastructure/best-discount-selector';

export const orderRoutes = (dataSource: DataSource) => {
  const router = Router();

  const pricingService = new PricingServiceImpl(
    new DefaultPricingStrategyFactory(),
    new BestDiscountSelector()
  );
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
