import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { customFetch } from "../utils/axios";
import NumberFormat from "react-number-format";
import FormRow from "./FormRow";

const CreateBudget = () => {
  const { setErrorMessage, errorShow, setShowGraph, setBudgets, budgets } =
    useGlobalContext();

  const [budget, setBudget] = useState({
    name: "",
    monthly_budget: "",
  });

  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("budgets", budget);
      setBudgets([...budgets, response.data.data]);
      setBudget({
        name: "",
        monthly_budget: "",
      });
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
            <FormRow
              type="text"
              name="name"
              value={budget.name}
              handleChange={handleChange}
              labelText="Name"
            />
            <div className="field">
              <NumberFormat
                className="input"
                name="monthly_budget"
                id="monthly_budget"
                value={budget.monthly_budget}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"$"}
                onChange={handleChange}
                placeholder="Monthly Income"
                required
              />
              <label htmlFor="monthly_budget">Monthly Income </label>
            </div>
            <div className="budget-entry-submit">
              <button className="btn submit" type="submit">
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
