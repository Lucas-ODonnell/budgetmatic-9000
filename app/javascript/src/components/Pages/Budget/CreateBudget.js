import React, { useState, useContext } from "react";
import AppContext from "../../../context/AppContext";
import BudgetContext from "../../../context/BudgetContext";
import axios from "axios";
import NumberFormat from "react-number-format";

const CreateBudget = () => {
  const { authorizationToken, setRenderBudget, setErrorMessage, errorShow } = useContext(AppContext);
  const { setShowGraph } = useContext(BudgetContext);
  const [budget, setBudget] = useState({
    name: "",
    monthly_budget: "",
  });

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: authorizationToken },
    };
		try {
			const response = await axios.post("/api/v1/budgets", budget, config)
			setBudget({
          name: "",
          monthly_budget: "",
        });
        setRenderBudget((oldKey) => oldKey + 1);
        setShowGraph(false);
		} catch (error) {
		setErrorMessage(error.response.data[0]);
			  errorShow();
		}
  };
  return (
    <section>
      <div className="budget-entry-container">
        <div className="budget-entry-content">
          <form onSubmit={handleSubmit} className="budget-entry-form">
            <div className="field">
              <label>Name </label>
              <input
                onChange={handleChange}
                value={budget.name}
                className="input"
                type="text"
                name="name"
              />
            </div>
            <div className="field">
              <label>Monthly Income </label>
              <NumberFormat
                className="input"
                name="monthly_budget"
                value={budget.monthly_budget}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"$"}
                onChange={handleChange}
              />
            </div>
            <div className="budget-entry-submit">
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateBudget;
