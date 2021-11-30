import React from "react";
import { useState } from "react";
import "./form.css";
import { FastCredit } from "./FastCredit";
import Button from "./Button/Button";

const FastCreditForm = () => {
  const initial: number = 0;
  const [enteredLoanSum, setEnteredLoanSum] = useState<number>(initial);
  const [enteredLoanPeriod, setEnteredLoanPeriod] = useState<number>(initial);
  const [submitedSuccess, setSubmitedSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);
  const [fastCredit, setFastCredit] = useState<FastCredit>();

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fastCredit = new FastCredit(enteredLoanSum, enteredLoanPeriod);
    setFastCredit(fastCredit);
    setError(!fastCredit.checkLoan());
    setEnteredLoanSum(0);
    setEnteredLoanPeriod(0);
    setSubmitedSuccess(fastCredit.checkLoan());
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
              <label htmlFor="loanSum">Fast Credit Amount in Euros</label>
              <input
                type="number"
                onChange={loanSumInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredLoanSum}
                name={"loanSum"}
              />
              <div className="H1">max ammount: 5000</div>
            </div>
            <hr></hr>
            <div className="form-control">
              <label htmlFor="loanPeriod">Fast Credit period in months</label>
              <input
                type="number"
                onChange={loanPeriodInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredLoanPeriod}
                name={"loanPeriod"}
              />
              <div className="H1">max period: 24 months</div>
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
              Fast Credit payment per month: {fastCredit?.sumPerMonth} Euros
            </h2>
            <h2> Total Amount to pay: {fastCredit?.totalAmount} Euros</h2>
          </>
        ) : error === true ? (
          <h2> Over Credit limits! </h2>
        ) : (
          <h2> </h2>
        )}
      </div>
    </>
  );
};
export default FastCreditForm;
