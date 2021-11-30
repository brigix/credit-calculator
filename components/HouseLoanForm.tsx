import React from "react";
import { useState } from "react";
import "./form.css";
import { HouseLoan } from "./HouseLoan";
import { roundAmount } from "./Utilities";
import Button from "./Button/Button";

const HouseLoanForm = () => {
  const initial: number = 0;
  const [enteredLoanSum, setEnteredLoanSum] = useState<number>(initial);
  const [enteredLoanPeriod, setEnteredLoanPeriod] = useState<number>(initial);
  const [enteredSalary, setEnteredSalary] = useState<number>(initial);
  const [enteredChildren, setEnteredChildren] = useState<number>(initial);
  const [submitedSuccess, setSubmitedSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);
  const [houseLoan, setHouseLoan] = useState<HouseLoan>();

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    function calculateMaxLoan() {
      const minimalIncome: number = 400;
      let maxSum: number =
        0.4 * (enteredSalary - (enteredChildren * minimalIncome) / 2);
      if (maxSum - minimalIncome <= minimalIncome) {
        return roundAmount(maxSum) * enteredLoanPeriod * 12;
      } else return 0;
    }

    const houseLoan = new HouseLoan(
      enteredLoanSum,
      enteredLoanPeriod * 12,
      enteredChildren,
      enteredSalary,
      calculateMaxLoan()
    );
    setHouseLoan(houseLoan);
    setError(!houseLoan.checkLoan());
    setEnteredLoanSum(0);
    setEnteredLoanPeriod(0);
    setEnteredChildren(0);
    setEnteredSalary(0);
    setSubmitedSuccess(houseLoan.checkLoan());
    setFormValid(false);
  };

  const formValidation = () => {
    if (!(enteredLoanSum === 0 || enteredLoanPeriod === 0)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };
  const loanSumInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredLoanSum(parseInt(event.target.value));
    formValidation();
  };
  const loanPeriodInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredLoanPeriod(parseInt(event.target.value));
    formValidation();
  };
  const salaryInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredSalary(parseInt(event.target.value));
    formValidation();
  };
  const childrenInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredChildren(parseInt(event.target.value));
    formValidation();
  };
  const inputBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValid(false);
    setSubmitedSuccess(false);
    formValidation();
  };

  return (
    <>
      <div className="flex-form">
        <form onSubmit={formSubmissionHandler}>
          <div className="control-group">
            <div className="form-control">
              <label htmlFor="loanSum">House Loan in Euros</label>
              <input
                type="number"
                onChange={loanSumInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredLoanSum}
                name={"loanSum"}
              />
              <div className="H1"></div>
            </div>
            <hr></hr>
            <div className="form-control">
              <label htmlFor="loanPeriod">House loan period in years</label>
              <input
                type="number"
                onChange={loanPeriodInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredLoanPeriod}
                name={"loanPeriod"}
              />
              <div className="H1">max period: 30 years</div>
            </div>
            <hr></hr>
            <div className="form-control">
              <label htmlFor="salary">Monthly Salary after taxes</label>
              <input
                type="number"
                onChange={salaryInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredSalary}
                name={"salary"}
              />
              <div className="H1"></div>
            </div>
            <hr></hr>
            <div className="form-control">
              <label htmlFor="children">Children</label>
              <input
                type="number"
                onChange={childrenInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredChildren}
                name={"children"}
              />
              <div className="H1"></div>
            </div>
          </div>
          <div className="form-actions">
            <Button
              name="Calculate"
              size="Button Button-Large"
              disabled={!formValid}
            ></Button>
          </div>
        </form>
      </div>
      <div>
        {submitedSuccess === true ? (
          <>
            <h2>
              House laoan payment per month: {houseLoan?.sumPerMonth} Euros
            </h2>
            <h2> Total amount to pay: {houseLoan?.totalAmount} Euros</h2>
            <h2> Max loan: {houseLoan?.maxSum} Euros</h2>
          </>
        ) : error === true ? (
          <>
            <h2> Over Credit limits! </h2>
            <h2> Max loan: {houseLoan?.maxSum} Euros</h2>
          </>
        ) : (
          <h2> </h2>
        )}
      </div>
    </>
  );
};
export default HouseLoanForm;
