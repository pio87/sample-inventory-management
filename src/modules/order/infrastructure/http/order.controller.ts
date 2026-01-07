import { Request, Response } from "express";
import { CreateOrderHandler } from "../../application/handlers/create-order.handler";
import { CreateOrderCommand } from "../../application/commands/create-order.command";
import { InsufficientStockError } from "../../../inventory/domain/errors/insufficient-stock.error";
import { EmptyOrderError } from "../../domain/errors/empty-order.error";
import { validationResult } from 'express-validator';
import { NotFoundError } from '../../../shared/errors/not-found.error';

export class OrderController {
  constructor(
    private readonly createOrderHandler: CreateOrderHandler
  ) {}

  async createOrder(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const body = req.body;

      const command = new CreateOrderCommand(
        body.customerId,
        body.items
      );

      await this.createOrderHandler.execute(command);

      return res.status(201).json({ status: "ok" });
    } catch (error: any) {
      if (error instanceof InsufficientStockError) {
        return res.status(409).json({
          message: error.message,
        });
      }

      if (error instanceof EmptyOrderError) {
        return res.status(400).json({
          message: error.message,
        });
      }

      if (error instanceof NotFoundError) {
        return res.status(404).json({
          message: error.message,
        });
      }

      console.error(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
