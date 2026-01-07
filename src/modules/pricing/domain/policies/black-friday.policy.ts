import { DiscountPolicy, DiscountContext } from "./discount.policy";
import { Price } from '../../../shared/domain/value-objects/price';

export class BlackFridayPolicy implements DiscountPolicy {
  isApplicable(context: DiscountContext): boolean {
    const date = context.date;
    const blackFriday = this.getBlackFridayDate(date.getFullYear());

    return (
      date.getFullYear() === blackFriday.getFullYear() &&
      date.getMonth() === blackFriday.getMonth() &&
      date.getDate() === blackFriday.getDate()
    );
  }

  apply(price: Price): Price {
    return price.decreaseByPercentage(0.25);
  }

  private getBlackFridayDate(year: number): Date {
    // November 1st
    const novemberFirst = new Date(year, 10, 1);

    // Day of the week for November 1st (0=Sun, 1=Mon, ..., 6=Sat)
    const firstDayOfWeek = novemberFirst.getDay();

    // Days to first Thursday
    const daysToFirstThursday =
      (4 - firstDayOfWeek + 7) % 7;

    // Date of the fourth Thursday
    const fourthThursday =
      1 + daysToFirstThursday + 21;

    // 5. Black Friday is the day after the fourth Thursday
    return new Date(year, 10, fourthThursday + 1);
  }
}
