import { PricingStrategy } from './pricing.strategy';
import { Price } from '../value-objects/price';
import { DiscountPolicy, DiscountContext } from '../policies';

export class AsiaPricingStrategy implements PricingStrategy {
  basePrice(): Price {
    return Price.create(90);
  }

  applyDiscounts(
    price: Price,
    policies: DiscountPolicy[],
    context: DiscountContext
  ): Price {
    return policies.reduce(
      (current, policy) => policy.apply(current, context),
      price
    );
  }
}
