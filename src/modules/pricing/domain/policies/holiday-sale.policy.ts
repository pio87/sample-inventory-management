import { DiscountPolicy, DiscountContext } from "./discount.policy";
import { Price } from "../value-objects/price";

export class HolidaySalePolicy implements DiscountPolicy {
  apply(price: Price, context: DiscountContext): Price {
    const month = context.date.getMonth();
    const isHoliday = month === 11; // December

    // TODO: Consider all Polish public holidays for more accurate discount application
    return isHoliday ? price.applyDiscount(0.15) : price;
  }
}
