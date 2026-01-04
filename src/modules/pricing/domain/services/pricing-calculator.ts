import { PricingStrategy } from "../strategies/pricing.strategy";
import { DiscountPolicy, DiscountContext } from "../policies/discount.policy";
import { Price } from "../value-objects/price";

export class PricingCalculator {
  constructor(
    private readonly strategy: PricingStrategy,
    private readonly policies: DiscountPolicy[]
  ) {}

  calculate(
    productId: string,
    context: DiscountContext
  ): Price {
    const base = this.strategy.basePrice(productId);
    return this.strategy.applyDiscounts(base, this.policies, context);
  }
}
