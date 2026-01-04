import { Price } from "../value-objects/price";
import { DiscountPolicy, DiscountContext } from '../policies';

export interface PricingStrategy {
  basePrice(productId: string): Price;
  applyDiscounts(
    price: Price,
    policies: DiscountPolicy[],
    context: DiscountContext
  ): Price;
}
