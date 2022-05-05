import React, {useState} from "react";
import colors from "../Budget/colors";
import {useBudgetContext} from "../../../context/BudgetContext";

const BarGraph = () => {
  const { total, entries, currentBudget, showGraph, setShowGraph } = useBudgetContext();
  const [categoryTotals, setCategoryTotals] = useState({
    Food: 0,
    Utilities: 0,
    Housing: 0,
    Transportation: 0,
    Insurance: 0,
    Medical: 0,
    Investments: 0,
    Personal: 0,
    Entertainment: 0,
    Misc: 0,
  });

  const percentageOfTotalBudget = (option) => {
    if (total === 0) return "0%";
    const quotient = option / total;
    return quotient.toLocaleString("en", {
      style: "percent",
      minimumFractionDigits: 2,
    });
  };

  const percentageOfMaxCategory = (option) => {
    let maxCategory = findMaxCategory();
    if (maxCategory === 0) return "0%";
    const quotient = option / maxCategory;
    return quotient.toLocaleString("en", { style: "percent" });
  };

  const findMaxCategory = () => {
    let answer = 0;
    Object.entries(categoryTotals).forEach((total) => {
      if (total[1] > answer) answer = total[1];
    });
    return answer;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setCategoryTotals({
      Food: 0,
      Utilities: 0,
      Housing: 0,
      Transportation: 0,
      Insurance: 0,
      Medical: 0,
      Investments: 0,
      Personal: 0,
      Entertainment: 0,
      Misc: 0,
    });
    entries.forEach((entry) => {
      setCategoryTotals((categoryTotals) => ({
        ...categoryTotals,
        [entry.attributes.category]:
          categoryTotals[entry.attributes.category] +
          entry.attributes.int_price,
      }));
    });
    setShowGraph(!showGraph);
  };

  const graph = Object.entries(categoryTotals).map((category, index) => {
    const [thisCategory, price] = [...category];
    if (price === 0) {
      return;
    }
    return showGraph && (
      <div key={index}>
        <div className="graph-name">{thisCategory}</div>
        <div
          className={`graph-data ${colors[thisCategory]}`}
          style={{ width: percentageOfMaxCategory(price) }}>
          {percentageOfTotalBudget(price)}
        </div>
      </div>
    )});

  return (
    <section>
      <div className="analysis-header">
        <button onClick={handleClick}>{showGraph ? "Hide Chart" : "Show Chart"}</button>
      </div>
      {showGraph && (
        <div className="analysis-body">
          <div className="bar-content">{graph}</div>
          <h3>
            *Categories in relation to total expenditure for the time period
          </h3>
          <p
            style={{
              color:
                (total / currentBudget.attributes.int_monthly_budget) * 100 < 80
                  ? "green"
                  : "red",
            }}>
            You have spent{" "}
            {(
              total / currentBudget.attributes.int_monthly_budget
            ).toLocaleString("en", {
              style: "percent",
              minimumFractionDigits: 2,
            })}{" "}
            of your monthly budget
          </p>
          <p>Try to stay below 80% of your monthly budget.</p>
        </div>
      )}
    </section>
  );
};

export default BarGraph;
