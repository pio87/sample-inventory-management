import { Price } from '../../../shared/domain/value-objects/price';
import { Region } from '../../../shared/types';

export interface DiscountContext {
  readonly subtotal: Price;
  readonly itemCount: number;
  readonly region: Region;
  readonly date: Date;
}

export interface DiscountPolicy {
  isApplicable(context: DiscountContext): boolean;
  apply(price: Price, context: DiscountContext): Price;
}
