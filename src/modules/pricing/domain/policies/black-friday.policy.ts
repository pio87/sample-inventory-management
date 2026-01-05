import { DiscountPolicy, DiscountContext } from "./discount.policy";
import { Price } from '../../../shared/domain/value-objects/price';

export class BlackFridayPolicy implements DiscountPolicy {
  isApplicable(context: DiscountContext): boolean {
    return (
      context.date.getMonth() === 10 && context.date.getDate() === 24
    );
  }

  apply(price: Price): Price {
    return price.decreaseByPercentage(0.25);
  }
}
