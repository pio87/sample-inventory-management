import { CreateOrderItemDTO } from '../dto/create-order-request.dto';
import { Region } from '../../../shared/types';


export class CreateOrderCommand {
  constructor(
    public readonly customerId: string,
    public readonly items: CreateOrderItemDTO[],
    public readonly region?: Region
  ) {}
}
