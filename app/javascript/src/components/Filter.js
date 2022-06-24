import React, { useState } from "react";

const Filter = ({
  total,
  income,
  tags,
  setTags,
  handleFilterSubmit,
  handleDateChange,
  date,
}) => {
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [input, setInput] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmed = input.trim();
    if (
      key === "," ||
      (key === "Enter" && trimmed.length && !tags.includes(trimmed))
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmed]);
      setInput("");
    }
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  return (
    <div className="filter-container">
      <div className="filter-content">
        <form className="filter" onSubmit={handleFilterSubmit}>
          <div className="cost-row">
            <div className="tag-container">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag}
                  <button onClick={() => deleteTag(index)}>x</button>
                </div>
              ))}
              <input
                placeholder="Filter Categories"
                id="category"
                value={input}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
                required
              />
              <label htmlFor="category">Category</label>
            </div>
            <div className="total">
              <div>
                <span>Income:</span>{" "}
                {(income / 100.0).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div>
                <span>Total Expenditure:</span>{" "}
                {(total / 100.0).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <div>
                <span>Money Left:</span>{" "}
                {((income - total) / 100.0).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          </div>
          <div className="filter-months">
            <input
              type="date"
              id="start"
              name="start"
              value={date.start}
              onChange={handleDateChange}
            />
            <input
              type="date"
              name="end"
              id="end"
              value={date.end}
              onChange={handleDateChange}
            />
            <button className="btn submit" type="submit">
              Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
