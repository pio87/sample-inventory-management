import { DiscountPolicy, DiscountContext } from "./discount.policy";
import { Price } from '../../../shared/domain/value-objects/price';

export class VolumeDiscountPolicy implements DiscountPolicy {
  isApplicable(context: DiscountContext): boolean {
    return context.itemCount >= 5;
  }

  apply(price: Price, context: DiscountContext): Price {
    if (context.itemCount >= 50) {
      return price.decreaseByPercentage(0.3);
    }
    if (context.itemCount >= 10) {
      return price.decreaseByPercentage(0.2);
    }
    if (context.itemCount >= 5) {
      return price.decreaseByPercentage(0.1);
    }
    return price;
  }
}
