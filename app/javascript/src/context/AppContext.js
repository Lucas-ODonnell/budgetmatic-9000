import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const AppContext = React.createContext();

const getStorageTheme = () => {
  let theme = "dark-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

export const AppProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState(() => () => {
    return;
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [total, setTotal] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [render, setRender] = useState(0);
  const currentBudget = budgets[activeTab];
  const [theme, setTheme] = useState(getStorageTheme());
  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  const errorShow = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  return (
    <AppContext.Provider
      value={{
        showWarning,
        setShowWarning,
        deleteFunction,
        setDeleteFunction,
        FontAwesomeIcon,
        errorShow,
        errorMessage,
        setErrorMessage,
        signedIn,
        setSignedIn,
        showError,
        budgets,
        setBudgets,
        activeTab,
        setActiveTab,
        entries,
        setEntries,
        total,
        setTotal,
        showGraph,
        setShowGraph,
        currentBudget,
        render,
        setRender,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
