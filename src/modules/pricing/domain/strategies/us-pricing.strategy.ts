import { PricingStrategy } from './pricing.strategy';
import { Price } from '../../../shared/domain/value-objects/price';
import { BlackFridayPolicy, DiscountPolicy, VolumeDiscountPolicy } from '../policies';

export class UsPricingStrategy implements PricingStrategy {
  private readonly discountPolicies: DiscountPolicy[] = [
    new BlackFridayPolicy(),
    new VolumeDiscountPolicy()
  ];

  getDiscountPolicies(): DiscountPolicy[] {
    return this.discountPolicies;
  }

  applyBasePrice(basePrice: Price): Price {
    return basePrice;
  }
}
