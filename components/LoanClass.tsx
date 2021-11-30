import LoanInterface from "./LoanInterface";
import { roundAmount } from "./Utilities";

export class LoanClass implements LoanInterface {
  loanPeriodInMonths: number;
  loanSum: number;
  maxPeriodInMonths: number;
  maxSum: number;
  interestRatePercent: number;
  sumPerMonth: number;
  totalAmount: number;

  constructor(
    loanSum: number,
    loanPeriodInMonths: number,
    maxSum: number,
    maxPeriodInMonths: number,
    interestRatePercent: number
  ) {
    this.maxPeriodInMonths = maxPeriodInMonths;
    this.maxSum = maxSum;
    this.interestRatePercent = interestRatePercent;
    this.loanSum = loanSum;
    this.loanPeriodInMonths = loanPeriodInMonths;
    this.sumPerMonth = this.calculateCredit();
    this.totalAmount = this.calculateTotalAmount();
  }

  calculateCredit() {
    if (this.checkLoan()) {
      let sumPerMonth: number;
      sumPerMonth = roundAmount(this.calculateAnnuity());
      return sumPerMonth;
    } else return 0;
  }
  calculateAnnuity() {
    let q: number = 1 + this.interestRatePercent / (100 * 12);
    let annuity: number =
      this.loanSum *
      ((Math.pow(q, this.loanPeriodInMonths) * (q - 1)) /
        (Math.pow(q, this.loanPeriodInMonths) - 1));
    return roundAmount(annuity);
  }

  calculateTotalAmount() {
    return roundAmount(this.loanPeriodInMonths * this.sumPerMonth);
  }

  checkLoan() {
    if (
      this.loanSum <= this.maxSum &&
      this.loanPeriodInMonths <= this.maxPeriodInMonths &&
      this.loanSum > 0 &&
      this.loanPeriodInMonths > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
