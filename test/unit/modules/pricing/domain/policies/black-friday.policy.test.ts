import { describe, expect, it } from 'vitest';
import { BlackFridayPolicy, DiscountContext } from '../../../../../../src/modules/pricing/domain/policies';
import { Price } from '../../../../../../src/modules/shared/domain/value-objects/price';


describe('BlackFridayPolicy', () => {
  const policy = new BlackFridayPolicy();

  it('should apply 25% discount on Black Friday', () => {
    const blackFridayDate = new Date(2023, 10, 24); // November 24, 2023
    const context = { date: blackFridayDate } as DiscountContext;
    const originalPrice = Price.create(100);

    expect(policy.isApplicable(context)).toBe(true);

    const discountedPrice = policy.apply(originalPrice);
    expect(discountedPrice.getValue()).toBe(75);
  });

  it('should not apply discount on non-Black Friday dates', () => {
    const nonBlackFridayDate = new Date(2023, 10, 25); // November 25, 2023
    const context = { date: nonBlackFridayDate } as DiscountContext;
    const originalPrice = Price.create(100);

    expect(policy.isApplicable(context)).toBe(false);
  });
});
