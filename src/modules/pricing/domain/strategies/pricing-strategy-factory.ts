import { PricingStrategy } from './pricing.strategy';
import { Region } from '../../../shared/types';
import { EuPricingStrategy } from './eu-pricing.strategy';
import { UsPricingStrategy } from './us-pricing.strategy';
import { AsiaPricingStrategy } from './asia-pricing.strategy';

export interface PricingStrategyFactory {
  fromRegion(region: Region): PricingStrategy;
}

export class DefaultPricingStrategyFactory implements PricingStrategyFactory
{
  fromRegion(region: Region): PricingStrategy {
    switch (region) {
      case Region.EU:
        return new EuPricingStrategy();
      case Region.US:
        return new UsPricingStrategy();
      case Region.ASIA:
        return new AsiaPricingStrategy();
      default:
        throw new Error(`Unsupported region: ${region}`);
    }
  }
}
