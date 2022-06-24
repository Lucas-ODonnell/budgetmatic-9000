import React from "react";
import { altFetch } from "../utils/axios";
import { useGlobalContext } from "../context/AppContext";
import { removeUserFromLocalStorage } from "../utils/localStorage";

const SignOut = () => {
  const { setSignedIn } = useGlobalContext();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const response = await altFetch.delete("logout");
      setSignedIn(false);
      removeUserFromLocalStorage();
      return response;
    } catch (error) {
      setSignedIn(false);
    }
  };

  return (
    <div className="budget-signout">
      <button className="btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
