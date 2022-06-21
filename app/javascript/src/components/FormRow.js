import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="field">
      <input
        id={name}
        className="input"
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={labelText || name}
        required
      />
      <label htmlFor={name}>{labelText || name}</label>
    </div>
  );
};

export default FormRow;
