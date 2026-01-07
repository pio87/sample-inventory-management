import { PricingStrategy } from './pricing.strategy';
import { Price } from '../../../shared/domain/value-objects/price';
import { BlackFridayPolicy, DiscountPolicy, HolidaySalePolicy, VolumeDiscountPolicy } from '../policies';

export class EuPricingStrategy implements PricingStrategy {
  private readonly VAT_RATE = 0.15;
  private readonly discountPolicies: DiscountPolicy[] = [
    new BlackFridayPolicy(),
    new VolumeDiscountPolicy(),
    new HolidaySalePolicy()
  ];

  getDiscountPolicies(): DiscountPolicy[] {
    return this.discountPolicies;
  }

  applyBasePrice(basePrice: Price): Price {
    return basePrice.increaseByPercentage(this.VAT_RATE);
  }
}
