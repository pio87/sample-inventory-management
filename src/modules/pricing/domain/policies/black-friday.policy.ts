import { DiscountPolicy, DiscountContext } from "./discount.policy";
import { Price } from "../value-objects/price";

export class BlackFridayPolicy implements DiscountPolicy {
  apply(price: Price, context: DiscountContext): Price {
    const isBlackFriday =
      context.date.getMonth() === 10 && context.date.getDate() === 24;

    return isBlackFriday ? price.applyDiscount(0.3) : price;
  }
}
