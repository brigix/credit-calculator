import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Button from "./components/Button/Button";
import FastCreditForm from "./components/FastCreditForm";
import HouseLoanForm from "./components/HouseLoanForm";
import ConsumerLoanForm from "./components/ConsumerLoanForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/fastCredit">
          <Button name="Fast Credit" size="Button Button-Large"></Button>
        </Link>
        <Link to="/houseLoan">
          <Button name="House Loan" size="Button Button-Large"></Button>
        </Link>
        <Link to="/consumerLoan">
          <Button name="Consumer Loan" size="Button Button-Large"></Button>
        </Link>
        <Routes>
          <Route path="/fastCredit" element={<FastCreditForm />} />
          <Route path="/houseLoan" element={<HouseLoanForm />} />
          <Route path="/consumerLoan" element={<ConsumerLoanForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
