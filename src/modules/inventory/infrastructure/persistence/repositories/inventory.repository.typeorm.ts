import { Repository } from "typeorm";
import { InventoryRepository } from "../../../domain/repositories/inventory.repository";
import { InventoryItem } from "../../../domain/entities/inventory-item";
import { ProductId } from "../../../domain/value-objects/product-id";
import { InventoryEntity } from "../schemas/inventory-entity";
import { InventoryMapper } from "../mappers/inventory.mapper";

export class InventoryRepositoryTypeORM implements InventoryRepository {
  constructor(private readonly repo: Repository<InventoryEntity>) {}

  async findByProductId(productId: ProductId): Promise<InventoryItem | null> {
    const entity = await this.repo.findOneBy({
      productId: productId.getValue(),
    });

    return entity ? InventoryMapper.toDomain(entity) : null;
  }

  async save(item: InventoryItem): Promise<void> {
    const entity = InventoryMapper.toPersistence(item);
    await this.repo.save(entity);
  }
}
