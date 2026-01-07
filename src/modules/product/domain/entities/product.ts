import { ProductId } from '../value-objects/product-id';
import { ProductName } from '../value-objects/product-name';
import { ProductDescription } from '../value-objects/product-description';
import { ProductCategory } from '../value-objects/product-category';
import { Price } from '../../../shared/domain/value-objects/price';


class Product {
  private constructor(
    private readonly id: ProductId,
    private name: ProductName,
    private description: ProductDescription,
    private price: Price,
    private category: ProductCategory
  ) {}

  static create(
    name: ProductName,
    description: ProductDescription,
    price: Price,
    category: ProductCategory,
    id?: ProductId
  ): Product {
    return new Product(
      id ?? ProductId.create(),
      name,
      description,
      price,
      category
    );
  }

  getId(): ProductId {
    return this.id;
  }

  getName(): string {
    return this.name.getValue();
  }

  getDescription(): string {
    return this.description.getValue();
  }

  getPrice(): Price {
    return this.price;
  }

  getCategory(): ProductCategory {
    return this.category;
  }

  changePrice(newPrice: Price): void {
    this.price = newPrice;
  }
}

export default Product;
