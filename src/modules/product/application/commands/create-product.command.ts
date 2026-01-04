import { CreateProductRequestDTO } from "../dto/create-product-request-dto";

export class CreateProductCommand {
  constructor(public readonly payload: CreateProductRequestDTO) {}
}
