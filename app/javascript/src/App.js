import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context/AppContext";
import Router from "./routes/Router";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Error from "./components/Error";
import { getUserFromLocalStorage } from "./utils/localStorage";

const App = () => {
  const { setSignedIn, showError, theme } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      setSignedIn(true);
      navigate("/");
    }
  }, []);

  return (
    <div className="background-form">
      <Error {...{ showError }} />
      <DeleteConfirmation />
      <Router />
    </div>
  );
};

export default App;
