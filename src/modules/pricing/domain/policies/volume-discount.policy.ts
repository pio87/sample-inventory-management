import { DiscountPolicy, DiscountContext } from "./discount.policy";
import { Price } from "../value-objects/price";

export class VolumeDiscountPolicy implements DiscountPolicy {
  apply(price: Price, context: DiscountContext): Price {
    if (context.quantity >= 10) {
      return price.applyDiscount(0.1); // 10%
    }
    return price;
  }
}
