import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  CreateProductCommand,
  CreateProductHandler,
  GetAllProductsHandler,
  GetAllProductsQuery
} from '../../application';

export class ProductController {
  constructor(
    private readonly createProductHandler: CreateProductHandler,
    private readonly getAllProductsHandler: GetAllProductsHandler
  ) {
  }

  async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const command = new CreateProductCommand({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    });

    const product = await this.createProductHandler.execute(command);

    return res.status(201).send({ id: product.getId().getValue() });
  }

  async getAll(_: Request, res: Response): Promise<Response> {
    const query = new GetAllProductsQuery();
    const products = await this.getAllProductsHandler.execute(query);

    return res.status(200).json(products);
  }
}
