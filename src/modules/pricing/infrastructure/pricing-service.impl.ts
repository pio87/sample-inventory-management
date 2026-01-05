import {
  PricingService,
  PricingItem,
  PricingResultItem,
} from "../application/PricingService";
import { PricingCalculator } from "../domain/services/pricing-calculator";
import {
  VolumeDiscountPolicy,
  BlackFridayPolicy,
  HolidaySalePolicy,
} from "../domain/policies";
import {
  UsPricingStrategy,
  EuPricingStrategy,
  AsiaPricingStrategy,
} from "../domain/strategies";
import { Price } from '../../order/domain';

export class PricingServiceImpl implements PricingService {
  async calculate(
    customerId: string,
    items: PricingItem[]
  ): Promise<PricingResultItem[]> {
    const region = this.resolveRegion(customerId);

    const strategy =
      region === "US"
        ? new UsPricingStrategy()
        : region === "EU"
          ? new EuPricingStrategy()
          : new AsiaPricingStrategy();

    const policies = [
      new VolumeDiscountPolicy(),
      new BlackFridayPolicy(),
      new HolidaySalePolicy(),
    ];

    const calculator = new PricingCalculator(strategy, policies);

    return items.map((item) => {
      const price = calculator.calculate(item.productId, {
        quantity: item.quantity,
        date: new Date(),
      });

      return {
        productId: item.productId,
        unitPrice: Price.create(price.getValue()),
      };
    });
  }

  private resolveRegion(customerId: string): "US" | "EU" | "ASIA" {
    // TODO: This needs to come from customer data
    return "EU";
  }
}
