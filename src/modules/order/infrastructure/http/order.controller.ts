import { Request, Response } from "express";
import { CreateOrderHandler } from "../../application/handlers/create-order.handler";
import { CreateOrderCommand } from "../../application/commands/create-order.command";
import { InsufficientStockError } from "../../../inventory/domain/errors/insufficient-stock.error";
import { EmptyOrderError } from "../../domain/errors/empty-order.error";

export class OrderController {
  constructor(
    private readonly createOrderHandler: CreateOrderHandler
  ) {}

  async createOrder(req: Request, res: Response): Promise<Response> {
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

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
