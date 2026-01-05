import {
  Product,
  ProductName,
  ProductDescription,
  ProductCategory,
  ProductRepository,
} from "../../domain";
import { CreateProductCommand } from "../commands/create-product.command";
import { Price } from '../../../shared/domain/value-objects/price';

export class CreateProductHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const { name, description, price, category } = command.payload;

    const product = Product.create(
      ProductName.create(name),
      ProductDescription.create(description),
      Price.create(price),
      category as ProductCategory
    );

    await this.productRepository.save(product);

    return product;
  }
}
