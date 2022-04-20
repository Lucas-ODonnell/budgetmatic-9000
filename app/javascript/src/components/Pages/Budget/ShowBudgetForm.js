import React, { useState, useContext } from "react";
import AppContext from "../../../context/AppContext";
import CreateBudget from "./CreateBudget";

const ShowBudgetForm = () => {
  const { FontAwesomeIcon } = useContext(AppContext);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  return (
    <section>
      <div
        className="new-budget"
        onClick={() => {
          setShowBudgetForm(!showBudgetForm);
        }}
      >
        <div className="icon">
          {showBudgetForm ? (
            <FontAwesomeIcon icon="fas fa-caret-down" />
          ) : (
            <FontAwesomeIcon icon="fas fa-caret-right" />
          )}
        </div>
        <p>New Budget</p>
      </div>
      {showBudgetForm ? <CreateBudget /> : <div></div>}
    </section>
  );
};

export default ShowBudgetForm;
