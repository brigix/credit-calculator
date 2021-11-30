import { LoanClass } from "./LoanClass";
import { roundAmount } from "./Utilities";

export class HouseLoan extends LoanClass {
  sumPerMonth: number;
  totalAmount: number;
  children: number;
  salary: number;
  constructor(
    loanSum: number,
    loanPeriodInMonths: number,
    children: number,
    salary: number,
    maxSum: number
  ) {
    const maxPeriodInMonths = 30 * 12;
    const interestRatePercent = 2;

    super(
      loanSum,
      loanPeriodInMonths,
      maxSum,
      maxPeriodInMonths,
      interestRatePercent
    );
    this.children = children;
    this.salary = salary;
    this.sumPerMonth = this.calculateCredit();
    this.totalAmount = this.calculateTotalAmount();
  }

  calculateMaxSum() {
    const minimalIncome: number = 400;
    let maxSum: number =
      0.4 * (this.salary - (this.children * minimalIncome) / 2);
    if (maxSum - minimalIncome > minimalIncome) {
      return roundAmount(maxSum);
    } else return 0;
  }
}
