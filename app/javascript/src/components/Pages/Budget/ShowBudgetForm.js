import React, { useState } from "react";
import { useGlobalContext } from "../../../context/AppContext";
import CreateBudget from "./CreateBudget";

const ShowBudgetForm = () => {
  const { FontAwesomeIcon } = useGlobalContext();
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
      {showBudgetForm && <CreateBudget /> }
    </section>
  );
};

export default ShowBudgetForm;
