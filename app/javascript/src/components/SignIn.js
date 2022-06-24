import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { addUserToLocalStorage } from "../utils/localStorage";
import { altFetch } from "../utils/axios";
import FormRow from "./FormRow";

const SignIn = ({ toggleSignUp }) => {
  const { setSignedIn } = useGlobalContext();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { user: userData };
    try {
      const response = await altFetch.post("login", user);
      if (response.headers.authorization === undefined) {
        setUserData({
          email: "",
          password: "",
        });
        return;
      }
      const authorization = response.headers.authorization;
      const authorizedUser = { ...response.data.data, authorization };
      addUserToLocalStorage(authorizedUser);
      setUserData({
        email: "",
        password: "",
      });
      setSignedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="devise-content">
      <div className="devise-header">
        <h1>Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className="devise-form">
        <FormRow
          type="email"
          name="email"
          value={userData.email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={userData.password}
          handleChange={handleChange}
          labelText="Password"
        />
        <div className="submit-area">
          <button className="btn submit" type="submit">
            Sign In
          </button>
        </div>
        <div className="toggle">
          <a href="#" onClick={toggleSignUp}>
            Sign Up &rarr;
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
