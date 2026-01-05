import { Price } from '../../shared/domain/value-objects/price';
import { DiscountContext, DiscountPolicy } from '../domain/policies';
import { DiscountSelector } from '../application/discount-selector';

export class BestDiscountSelector implements DiscountSelector {
  select(
    basePrice: Price,
    policies: DiscountPolicy[],
    context: DiscountContext
  ): Price {
    return policies
      .filter(policy => policy.isApplicable(context))
      .map(policy => policy.apply(basePrice, context))
      .reduce(
        (lowest, current) =>
          current.isLowerThan(lowest) ? current : lowest,
        basePrice
      );
  }
}
