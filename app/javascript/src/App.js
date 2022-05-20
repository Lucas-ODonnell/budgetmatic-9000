import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context/AppContext";
import Router from "./routes/Router";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Error from "./components/Error";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const App = () => {
  const { setSignedIn, showError, authorizationToken, setAuthorizationToken } =
    useGlobalContext();

  const [theme, setTheme] = useState(getStorageTheme());

  const navigate = useNavigate();

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    if (localStorage.Authorization !== null) {
      const AuthorizedToken = localStorage.getItem("Authorization");
      setAuthorizationToken(JSON.parse(AuthorizedToken));
      setSignedIn(true);
      navigate("/");
    }
  }, [authorizationToken]);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="background-form">
      <Error {...{ showError }} />
      <DeleteConfirmation />
      <Router />
      <button className="toggle-theme" onClick={toggleTheme}>
        Toggle {theme === "light-theme" ? "dark mode" : "light mode"}
      </button>
    </div>
  );
};

export default App;
