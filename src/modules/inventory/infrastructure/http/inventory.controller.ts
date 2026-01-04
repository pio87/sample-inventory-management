import { Request, Response } from "express";
import { RestockProductHandler } from "../../application/handlers/restock-product.handler";
import { SellProductHandler } from "../../application/handlers/sell-product.handler";
import { RestockProductCommand } from "../../application/commands/restock-product.command";
import { SellProductCommand } from "../../application/commands/sell-product.command";
import { InsufficientStockError } from "../../domain/errors/insufficient-stock.error";
import { InvalidQuantityError } from "../../domain/errors/invalid-quantity.error";
import { NotFoundError } from '../../../shared/errors/not-found.error';

export class InventoryController {
  constructor(
    private readonly restockHandler: RestockProductHandler,
    private readonly sellHandler: SellProductHandler
  ) {}

  async restock(req: Request, res: Response): Promise<Response> {
    try {
      const command = new RestockProductCommand(
        req.params.id,
        req.body.quantity
      );

      await this.restockHandler.execute(command);

      return res.status(200).json({ status: "stock increased" });
    } catch (error: any) {
      if (error instanceof InvalidQuantityError) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async sell(req: Request, res: Response): Promise<Response> {
    try {
      const command = new SellProductCommand(
        req.params.id,
        req.body.quantity
      );

      await this.sellHandler.execute(command);

      return res.status(200).json({ status: "stock decreased" });
    } catch (error: any) {
      if (error instanceof InsufficientStockError) {
        return res.status(409).json({ message: error.message });
      }

      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      if (error instanceof InvalidQuantityError) {
        return res.status(400).json({ message: error.message });
      }

      console.error(error);

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
