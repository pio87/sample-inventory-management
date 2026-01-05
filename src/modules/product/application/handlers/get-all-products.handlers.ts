import { ProductRepository } from '../../domain';
import { GetAllProductsQuery } from '../queries/get-all-products.query';
import { ProductResponseDTO } from '../dto/product-response.dto';

export class GetAllProductsHandler {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(_: GetAllProductsQuery): Promise<ProductResponseDTO[]> {
    const products = await this.productRepository.findAll();

    return products.map((p) => ({
      id: p.getId().getValue(),
      name: p.getName(),
      description: p.getDescription(),
      price: p.getPrice().getValue(),
      category: p.getCategory(),
    }));
  }
}
