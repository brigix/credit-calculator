import { LoanClass } from "./LoanClass";
export class ConsumerLoan extends LoanClass {
  sumPerMonth: number;
  totalAmount: number;
  constructor(
    loanSum: number,
    loanPeriodInMonths: number,
    interestRatePercent: number
  ) {
    const maxPeriodInMonths = 5 * 12;
    const maxSum = 10000;
    super(
      loanSum,
      loanPeriodInMonths,
      maxSum,
      maxPeriodInMonths,
      interestRatePercent
    );
    this.sumPerMonth = this.calculateCredit();
    this.totalAmount = this.calculateTotalAmount();
  }
}
