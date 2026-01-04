import { ProductRepository, Product } from '../../../domain';

export class ProductRepositoryMongo implements ProductRepository {
  async save(product: Product) {
    // save product in mongodb
  }

  async findById() {
    return null;
  }

  async findAll() {
    return [];
  }
}
