import { Repository } from "typeorm";
import { Product, ProductId, ProductRepository } from "../../../domain";
import { ProductMapper } from "../mappers/product.mapper";
import { ProductEntity } from '../schemas/product-entity';

export class ProductRepositoryTypeORM implements ProductRepository {
  constructor(private readonly repo: Repository<ProductEntity>) {}

  async save(product: Product): Promise<void> {
    const entity = ProductMapper.toPersistence(product);
    await this.repo.save(entity);
  }

  async findById(id: ProductId): Promise<Product | null> {
    const entity = await this.repo.findOneBy({ id: id.getValue() });
    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repo.find();
    return entities.map(ProductMapper.toDomain);
  }
}
