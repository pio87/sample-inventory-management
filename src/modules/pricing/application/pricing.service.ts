import { Price } from '../../shared/domain/value-objects/price';
import { DiscountContext } from '../domain/policies';

export interface PricingService {
  calculateTotal(
    subtotal: Price,
    context: DiscountContext
  ): Price
}
