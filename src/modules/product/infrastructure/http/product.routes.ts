import { Router } from 'express';
import { ProductController } from './product.controller';
import { createProductValidator } from './validators/create-product.validator';
import { CreateProductHandler, GetAllProductsHandler } from '../../application';
import { ProductEntity } from '../persistence/schemas/product-entity';
import { ProductRepositoryTypeORM } from '../persistence/repositories/product.repository-typeorm';
import { DataSource } from 'typeorm';

export const productRoutes = (dataSource: DataSource) => {

  const router = Router();

  const typeOrmRepo = dataSource.getRepository(ProductEntity);
  const productRepository = new ProductRepositoryTypeORM(typeOrmRepo);
  const createProductHandler = new CreateProductHandler(productRepository);
  const getAllProductsHandler = new GetAllProductsHandler(productRepository);

  const controller = new ProductController(createProductHandler, getAllProductsHandler);

  router.post('/products', createProductValidator, controller.create.bind(controller));
  router.get('/products', controller.getAll.bind(controller));

  return router;
}
