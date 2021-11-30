import React from "react";
import { useState } from "react";
import "./form.css";
import { ConsumerLoan } from "./ConsumerLoan";
import Button from "./Button/Button";
import { products } from "./products";

const ConsumerLoanForm = () => {
  const initial: number = 0;
  const [enteredLoanSum, setEnteredLoanSum] = useState<number>(initial);
  const [enteredLoanPeriod, setEnteredLoanPeriod] = useState<number>(initial);
  const [interestRatePercent, setInterestRatePercent] =
    useState<number>(initial);
  const [submitedSuccess, setSubmitedSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);
  const [consumerLoan, setConsumerLoan] = useState<ConsumerLoan>();

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const consumerLoan = new ConsumerLoan(
      enteredLoanSum,
      enteredLoanPeriod,
      interestRatePercent
    );
    setConsumerLoan(consumerLoan);
    setError(!consumerLoan.checkLoan());
    setEnteredLoanSum(0);
    setEnteredLoanPeriod(0);
    setSubmitedSuccess(consumerLoan.checkLoan());
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
  const interestRateInputChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInterestRatePercent(parseInt(event.target.value));
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
              <label htmlFor="loanSum">Consumer loan amount in Euros</label>
              <input
                type="number"
                onChange={loanSumInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredLoanSum}
                name={"loanSum"}
              />
              <div className="H1">max ammount: 10000</div>
            </div>
            <hr></hr>
            <div className="form-control">
              <label htmlFor="loanPeriod">Consumer loan period in months</label>
              <input
                type="number"
                onChange={loanPeriodInputChangeHandler}
                onBlur={inputBlurHandler}
                value={enteredLoanPeriod}
                name={"loanPeriod"}
              />
              <div className="H1">max period: 60 months</div>
            </div>
            <hr></hr>
            <div className="form-control">
              <label htmlFor="products">Select product: </label>
              <select
                onChange={interestRateInputChangeHandler}
                defaultValue={initial}
              >
                {products.map((item) => {
                  return (
                    <option
                      value={item.interestRate}
                      label={item.label}
                      key={item.id}
                    >
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <hr></hr>
            <div className="form-actions">
              <Button
                name="Calculate"
                size="Button Button-Large"
                disabled={!formValid}
              ></Button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {submitedSuccess === true ? (
          consumerLoan?.interestRatePercent === 0 ? (
            <>
              <h2>Interest Rate error! </h2>
              <h2>Please select a product. </h2>
            </>
          ) : (
            <>
              <h2>
                Fast Credit payment per month: {consumerLoan?.sumPerMonth} Euros
              </h2>
              <h2>
                Interest rate for selected products:{" "}
                {consumerLoan?.interestRatePercent} %
              </h2>
              <h2> Total Amount to pay: {consumerLoan?.totalAmount} Euros</h2>
            </>
          )
        ) : error === true ? (
          <h2> Over Credit limits! </h2>
        ) : (
          <h2> </h2>
        )}
      </div>
    </>
  );
};
export default ConsumerLoanForm;
