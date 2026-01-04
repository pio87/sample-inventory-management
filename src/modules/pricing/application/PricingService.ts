import { Price } from '../../order/domain';

export interface PricingItem {
  productId: string;
  quantity: number;
}

export interface PricingResultItem {
  productId: string;
  unitPrice: Price;
}

export interface PricingService {
  calculate(
    customerId: string,
    items: PricingItem[]
  ): Promise<PricingResultItem[]>;
}
