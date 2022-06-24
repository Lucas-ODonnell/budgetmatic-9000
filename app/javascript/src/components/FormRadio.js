import React from "react";

const FormRadio = ({ name, value, handleChange, budgetEntry }) => {
  return (
    <div className="form__radio-group">
      <input
        className="form__radio-input"
        type="radio"
        name={name}
        value={value}
        id={value}
        checked={budgetEntry.category === value}
        onChange={handleChange}
      />
      <label className="form__radio-label" htmlFor={value}>
        <span className="form__radio-button"></span>
        {value}
      </label>
    </div>
  );
};

export default FormRadio;
