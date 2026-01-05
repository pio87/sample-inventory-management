import { Price } from '../../../shared/domain/value-objects/price';
import { DiscountPolicy } from '../policies';

export interface PricingStrategy {
  applyBasePrice(basePrice: Price): Price;
  getDiscountPolicies(): DiscountPolicy[];
}
