import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PricingStrategyFactory } from '../../../../src/modules/pricing/domain/strategies/pricing-strategy-factory';
import { DiscountSelector } from '../../../../src/modules/pricing/application/discount-selector';
import { PricingServiceImpl } from '../../../../src/modules/pricing/infrastructure/pricing-service.impl';
import { PricingStrategy } from '../../../../src/modules/pricing/domain/strategies';
import { Price } from '../../../../src/modules/shared/domain/value-objects/price';
import { DiscountContext } from '../../../../src/modules/pricing/domain/policies';
import { Region } from '../../../../src/modules/shared/types';

describe("PricingServiceImpl", () => {
  let pricingStrategyFactory: PricingStrategyFactory;
  let discountSelector: DiscountSelector;
  let pricingService: PricingServiceImpl;

  const mockStrategy: PricingStrategy = {
    applyBasePrice: vi.fn(),
    getDiscountPolicies: vi.fn(),
  };

  beforeEach(() => {
    pricingStrategyFactory = {
      fromRegion: vi.fn().mockReturnValue(mockStrategy),
    };

    discountSelector = {
      select: vi.fn(),
    };

    pricingService = new PricingServiceImpl(
      pricingStrategyFactory,
      discountSelector
    );
  });

  it("should apply regional pricing and then select the best discount", () => {
    const subtotal = Price.create(100);
    const regionalPrice = Price.create(115);
    const finalPrice = Price.create(100);

    const context: DiscountContext = {
      region: Region.EU,
      date: new Date(),
      itemCount: 3,
      subtotal,
    };

    (mockStrategy.applyBasePrice as any).mockReturnValue(regionalPrice);
    (mockStrategy.getDiscountPolicies as any).mockReturnValue(["policy1"]);
    (discountSelector.select as any).mockReturnValue(finalPrice);

    const result = pricingService.calculateTotal(subtotal, context);

    expect(pricingStrategyFactory.fromRegion).toHaveBeenCalledWith("EU");
    expect(mockStrategy.applyBasePrice).toHaveBeenCalledWith(subtotal);

    expect(discountSelector.select).toHaveBeenCalledWith(
      regionalPrice,
      ["policy1"],
      context
    );

    expect(result).toBe(finalPrice);
  });

  it("should return regional price when no discounts are applicable", () => {
    const subtotal = Price.create(200);
    const regionalPrice = Price.create(230);

    const context: DiscountContext = {
      region: Region.EU,
      date: new Date(),
      itemCount: 1,
      subtotal,
    };

    (mockStrategy.applyBasePrice as any).mockReturnValue(regionalPrice);
    (mockStrategy.getDiscountPolicies as any).mockReturnValue([]);
    (discountSelector.select as any).mockReturnValue(regionalPrice);

    const result = pricingService.calculateTotal(subtotal, context);

    expect(result).toBe(regionalPrice);
  });
});
