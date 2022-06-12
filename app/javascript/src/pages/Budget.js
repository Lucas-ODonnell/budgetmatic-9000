import React, { useEffect } from "react";
import { customFetch } from "../utils/axios";
import { useGlobalContext } from "../context/AppContext";
import {
  Tabs,
  TabContent,
  ShowBudgetForm,
  ShowBudgetEntryContent,
} from "../components";
import { removeUserFromLocalStorage } from "../utils/localStorage";

const Budget = () => {
  const {
    setSignedIn,
    setBudgets,
    budgets,
    activeTab,
    setActiveTab,
    setShowGraph,
  } = useGlobalContext();

  const getBudget = async () => {
    try {
      const response = await customFetch.get("budgets.json");
      setBudgets([]);
      response.data.data.forEach((object) => {
        setBudgets((budgets) => [...budgets, object]);
      });
    } catch (err) {
      removeUserFromLocalStorage();
      setSignedIn(false);
    }
  };

  useEffect(() => {
    getBudget();
  }, [budgets.length]);

  return (
    <section>
      <div className="budget-container">
        <div className="budget-content">
          <div className="budget-nav">
            <div>
              <Tabs {...{ budgets, activeTab, setActiveTab, setShowGraph }} />
            </div>
          </div>
          <div>
            <ShowBudgetForm />
          </div>
          <div className="outlet">
            {budgets.map((_, index) => {
              return (
                <TabContent id={index} activeTab={activeTab} key={index}>
                  <ShowBudgetEntryContent />
                </TabContent>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Budget;
