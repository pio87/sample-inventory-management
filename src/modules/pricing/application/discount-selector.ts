import { DiscountContext, DiscountPolicy } from '../domain/policies';
import { Price } from '../../shared/domain/value-objects/price';

export interface DiscountSelector {
  select(
    basePrice: Price,
    policies: DiscountPolicy[],
    context: DiscountContext
  ): Price;
}
