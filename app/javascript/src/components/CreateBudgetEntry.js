import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { customFetch } from "../utils/axios";
import NumberFormat from "react-number-format";
import FormRow from "./FormRow";

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
              <label>Category </label>
              <div className="category-row">
                <input
                  name="category"
                  value="food"
                  type="radio"
                  checked={budgetEntry.category === "food"}
                  onChange={handleChange}
                />
                <label>Food</label>
                <input
                  name="category"
                  value="utilities"
                  type="radio"
                  checked={budgetEntry.category === "utilities"}
                  onChange={handleChange}
                />
                <label>Utilities</label>
                <input
                  name="category"
                  value="housing"
                  type="radio"
                  checked={budgetEntry.category === "housing"}
                  onChange={handleChange}
                />
                <label>Housing</label>
                <input
                  name="category"
                  value="transportation"
                  type="radio"
                  checked={budgetEntry.category === "transportation"}
                  onChange={handleChange}
                />
                <label>Transportation</label>
                <input
                  name="category"
                  value="insurance"
                  type="radio"
                  checked={budgetEntry.category === "insurance"}
                  onChange={handleChange}
                />
                <label>Insurance</label>
              </div>
              <div className="category-row">
                <input
                  name="category"
                  value="medical"
                  type="radio"
                  checked={budgetEntry.category === "medical"}
                  onChange={handleChange}
                />
                <label>Medical</label>
                <input
                  name="category"
                  value="investments"
                  type="radio"
                  checked={budgetEntry.category === "investments"}
                  onChange={handleChange}
                />
                <label>Investments</label>
                <input
                  name="category"
                  value="personal"
                  type="radio"
                  checked={budgetEntry.category === "personal"}
                  onChange={handleChange}
                />
                <label>Personal</label>
                <input
                  name="category"
                  value="entertainment"
                  type="radio"
                  checked={budgetEntry.category === "entertainment"}
                  onChange={handleChange}
                />
                <label>Entertainment</label>
                <input
                  name="category"
                  value="misc"
                  type="radio"
                  checked={budgetEntry.category === "misc"}
                  onChange={handleChange}
                />
                <label>Misc</label>
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

export default CreateBudgetEntry;
