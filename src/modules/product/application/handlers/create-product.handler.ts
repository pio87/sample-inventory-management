import {
  Product,
  ProductName,
  ProductDescription,
  ProductCategory,
  Price,
  ProductRepository,
} from "../../domain";
import { CreateProductCommand } from "../commands/create-product.command";

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
