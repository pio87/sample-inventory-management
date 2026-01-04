import { Price } from "../value-objects/price";

export interface DiscountContext {
  quantity: number;
  date: Date;
}

export interface DiscountPolicy {
  apply(price: Price, context: DiscountContext): Price;
}
