import { ProductEntity } from "../schemas/product-entity";
import {
  Product,
  ProductId,
  ProductName,
  ProductDescription,
  ProductCategory,
  Price,
} from "../../../domain";

export class ProductMapper {
  static toPersistence(product: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.id = product.getId().getValue();
    entity.name = product.getName();
    entity.description = product.getDescription();
    entity.price = product.getPrice().getAmount();
    entity.category = product.getCategory();
    return entity;
  }

  static toDomain(entity: ProductEntity): Product {
    return Product.create(
      ProductName.create(entity.name),
      ProductDescription.create(entity.description),
      Price.create(Number(entity.price)),
      entity.category as ProductCategory,
      ProductId.create(entity.id)
    );
  }
}
