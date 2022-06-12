import React, { useState, useEffect } from "react";
import { customFetch } from "../utils/axios";
import { useGlobalContext } from "../context/AppContext";
import Entry from "./Entry";
import Filter from "./Filter";
import EntryTableHeader from "./EntryTableHeader";
import { removeUserFromLocalStorage } from "../utils/localStorage";

const EntriesIndex = () => {
  const {
    setSignedIn,
    FontAwesomeIcon,
    currentBudget,
    entries,
    setEntries,
    total,
    setTotal,
    setShowGraph,
    render,
    setRender,
  } = useGlobalContext();

  const id = `?id=${currentBudget.id}&`;
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const [income, setIncome] = useState(0);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    getBudgetEntries();
  }, [render]);

  const getBudgetEntries = async () => {
    try {
      setTotal(0);
      setIncome(0);
      const response = await customFetch.get(`budget_entries${id}${query}`);
      setIncome(currentBudget.attributes.int_monthly_budget);
      setQuery(`?id=${currentBudget.id}&`);
      const array = [];
      response.data.data.forEach((object) => {
        setTotal((total) => total + object.attributes.int_price);
        array.push(object);
      });
      setEntries(array);
    } catch (err) {
      setSignedIn(false);
      removeUserFromLocalStorage();
    }
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let thisQuery = "";
    tags.forEach((tag, index) => (thisQuery += `category${index}=${tag}&`));
    let queryFragment = Object.keys(date)
      .map((key) => key + "=" + date[key])
      .join("&");
    thisQuery += queryFragment;
    setQuery(thisQuery);
    setRender((oldKey) => oldKey + 1);
    setShowGraph(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await customFetch.delete(`budget_entries/${id}`);
      let newList = entries.filter((entry) => {
        entry.id !== id;
      });
      setEntries(newList);
      setShowGraph(false);
      setRender((oldKey) => oldKey + 1);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="entries-container">
        <div className="entries-content">
          <table>
            <EntryTableHeader />
            <tbody>
              {entries.map((entry) => {
                const { category, name, price, date } = entry.attributes;
                const { id } = entry;
                return (
                  <Entry
                    key={id}
                    {...{
                      category,
                      name,
                      price,
                      date,
                      handleDelete,
                      FontAwesomeIcon,
                      id,
                    }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Filter
        {...{
          total,
          income,
          tags,
          setTags,
          handleFilterSubmit,
          handleDateChange,
          date,
        }}
      />
    </section>
  );
};

export default EntriesIndex;
