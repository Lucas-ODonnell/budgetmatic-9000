import React from "react";
import { useGlobalContext } from "../context/AppContext";

const Theme = () => {
  const { toggleTheme, theme } = useGlobalContext();
  return (
    <button className="btn" onClick={toggleTheme}>
      Toggle {theme === "light-theme" ? "dark mode" : "light mode"}
    </button>
  );
};

export default Theme;
