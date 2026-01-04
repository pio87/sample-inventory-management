import Product from "../entities/product";
import { ProductId } from "../value-objects/product-id";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
