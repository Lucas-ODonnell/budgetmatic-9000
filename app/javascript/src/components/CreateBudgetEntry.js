import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { customFetch } from "../utils/axios";
import NumberFormat from "react-number-format";
import FormRow from "./FormRow";
import FormRadio from "./FormRadio";
import { Categories } from "../utils/links";

const CreateBudgetEntry = () => {
  const {
    errorShow,
    setErrorMessage,
    currentBudget,
    setShowGraph,
    entries,
    setEntries,
  } = useGlobalContext();

  const [budgetEntry, setBudgetEntry] = useState({
    category: "food",
    name: "",
    price: "",
    budget_id: currentBudget.id,
  });

  const handleChange = (e) => {
    setBudgetEntry({ ...budgetEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("budget_entries", budgetEntry);
      setEntries([...entries, response.data.data]);
      setBudgetEntry({
        category: "food",
        name: "",
        price: "",
        budget_id: currentBudget.id,
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
            <div className="field">
              <div className="category__row">
                {Categories.map((category) => {
                  const { id, name, value } = category;
                  return (
                    <FormRadio
                      key={id}
                      name={name}
                      value={value}
                      handleChange={handleChange}
                      budgetEntry={budgetEntry}
                    />
                  );
                })}
              </div>
            </div>
            <FormRow
              type="text"
              name="name"
              value={budgetEntry.name}
              handleChange={handleChange}
              labelText="Name"
            />
            <div className="field">
              <NumberFormat
                className="input"
                name="price"
                id="price"
                value={budgetEntry.price}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"$"}
                onChange={(e) => handleChange(e, setBudgetEntry, budgetEntry)}
                placeholder="Price"
              />
              <label htmlFor="price">Price </label>
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

export default CreateBudgetEntry;
