import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="field">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        id={name}
        className="input"
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
