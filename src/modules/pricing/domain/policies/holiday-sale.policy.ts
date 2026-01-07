import { DiscountContext, DiscountPolicy } from './discount.policy';
import { Price } from '../../../shared/domain/value-objects/price';

export class HolidaySalePolicy implements DiscountPolicy {
  private discountedCategories: string[] = ['shoes', 'toys'];

  isApplicable(context: DiscountContext): boolean {
    const month = context.date.getMonth();
    const isHoliday = month === 11; // whole December

    // TODO: Consider all Polish public holidays
    // TODO: Should be applied only for specific product categories
    return isHoliday;
  }

  apply(price: Price): Price {
    return price.decreaseByPercentage(0.15);
  }
}
