import React, { useState } from "react";
import { SignIn, SignUp } from "../components";

const Devise = () => {
  const [signUp, setSignUp] = useState(false);

  const toggleSignUp = (e) => {
    e.preventDefault();
    setSignUp(!signUp);
  };
  return (
    <section>
      <div className="app-name">
        <h1>BudgetMatic 9000</h1>
      </div>
      <div className="background-form">
        <div className="devise-container">
          {signUp ? (
            <SignUp {...{ toggleSignUp }} />
          ) : (
            <SignIn {...{ toggleSignUp }} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Devise;
