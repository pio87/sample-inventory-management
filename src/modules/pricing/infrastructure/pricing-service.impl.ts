import { PricingService } from '../application/pricing.service';
import { Price } from '../../shared/domain/value-objects/price';
import { DiscountContext } from '../domain/policies';
import { PricingStrategyFactory } from '../domain/strategies/pricing-strategy-factory';
import { DiscountSelector } from '../application/discount-selector';

export class PricingServiceImpl implements PricingService {
  constructor(
    private readonly pricingStrategyFactory: PricingStrategyFactory,
    private readonly discountSelector: DiscountSelector
  ) {}

  calculateTotal(
    subtotal: Price,
    context: DiscountContext
  ): Price {
    const strategy = this.pricingStrategyFactory.fromRegion(context.region);

    const regionalPrice = strategy.applyBasePrice(subtotal);

    return this.discountSelector.select(
      regionalPrice,
      strategy.getDiscountPolicies(),
      context
    );
  }
}
