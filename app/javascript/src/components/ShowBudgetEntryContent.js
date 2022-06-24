import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { customFetch } from "../utils/axios";
import CreateBudgetEntry from "./CreateBudgetEntry";
import EntriesIndex from "./EntriesIndex";
import NumberFormat from "react-number-format";
import FormRow from "./FormRow";

const ShowBudgetEntryContent = () => {
  const {
    FontAwesomeIcon,
    setDeleteFunction,
    setShowWarning,
    currentBudget,
    setShowGraph,
    setBudgets,
    budgets,
  } = useGlobalContext();

  const [showBudgetEntry, setShowBudgetEntry] = useState(false);
  const [editBudget, setEditBudget] = useState(false);
  const [update, setUpdate] = useState({
    name: "",
    monthly_budget: "",
  });

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleBudgetDelete = async () => {
    try {
      const response = await customFetch.delete(`budgets/${currentBudget.id}`);
      const newBudgets = budgets.filter((thisBudget) => {
        thisBudget.id !== currentBudget.id;
      });
      setBudgets(newBudgets);
      setShowGraph(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleBudgetUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.put(
        `budgets/${currentBudget.id}`,
        update
      );
      setUpdate({
        name: `${currentBudget.attributes.name}`,
        monthly_budget: `${currentBudget.attributes.monthly_budget}`,
      });
      setShowGraph(false);
      return response;
    } catch (error) {
      console.log(response);
    }
  };

  return (
    <>
      <div className="budget-header">
        {!editBudget ? (
          <>
            <h1
              onClick={() => {
                setEditBudget(true);
              }}
            >
              {currentBudget.attributes.name}
            </h1>
            <div className="budget-options">
              <button
                className="btn"
                onClick={() => {
                  setShowWarning(true);
                  setDeleteFunction(() => () => handleBudgetDelete());
                }}
              >
                <FontAwesomeIcon icon="fas fa-times" />
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              handleBudgetUpdate(e);
              setEditBudget(false);
            }}
            className="budget-entry-form update-form"
          >
            <FormRow
              type="text"
              name="name"
              value={update.name}
              handleChange={handleChange}
              labelText="Update name"
            />
            <div className="field">
              <NumberFormat
                className="input"
                name="monthly_budget"
                id="monthly_budget"
                value={update.monthly_budget}
                thousandSeparator={true}
                decimalScale={2}
                prefix={"$"}
                onChange={handleChange}
                placeholder="Update monthly income"
              />
              <label htmlFor="monthly_budget">Update monthly income </label>
            </div>
            <button className="btn" onClick={() => setEditBudget(false)}>
              Cancel
            </button>
            <button className="btn update" type="submit">
              Update
            </button>
          </form>
        )}
      </div>
      <div
        className="budget-entry"
        onClick={() => {
          setShowBudgetEntry(!showBudgetEntry);
        }}
      >
        <div className="icon">
          {showBudgetEntry ? (
            <FontAwesomeIcon icon="fas fa-caret-down" />
          ) : (
            <FontAwesomeIcon icon="fas fa-caret-right" />
          )}
        </div>
        <p>New Budget Entry</p>
      </div>
      {showBudgetEntry && <CreateBudgetEntry />}
      <EntriesIndex />
    </>
  );
};

export default ShowBudgetEntryContent;
