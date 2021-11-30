import { LoanClass } from "./LoanClass";
export class FastCredit extends LoanClass {
  sumPerMonth: number;
  totalAmount: number;
  constructor(loanSum: number, loanPeriodInMonths: number) {
    const maxPeriodInMonths = 2 * 12;
    const maxSum = 5000;
    const interestRatePercent = 20;
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
