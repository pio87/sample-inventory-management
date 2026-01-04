import { CreateOrderItemDTO } from '../dto/create-order-request.dto';


export class CreateOrderCommand {
  constructor(
    public readonly customerId: string,
    public readonly items: CreateOrderItemDTO[]
  ) {}
}
