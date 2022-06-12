import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { addUserToLocalStorage } from "../utils/localStorage";
import { altFetch } from "../utils/axios";
import FormRow from "./FormRow";

const SignUp = ({ toggleSignUp }) => {
  const { setSignedIn } = useGlobalContext();
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { user: newUserData };
    try {
      const response = await altFetch.post("signup", newUser);
      if (response.headers.authorization === undefined) {
        setNewUserData({
          name: "",
          email: "",
          password: "",
        });
        return;
      }
      const authorization = response.headers.authorization;
      const authorizedUser = { ...response.data.data, authorization };
      addUserToLocalStorage(authorizedUser);
      setNewUserData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      setSignedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setNewUserData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }
  };

  return (
    <div className="devise-content">
      <div className="devise-header">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit} className="devise-form">
        <FormRow
          type="text"
          name="name"
          value={newUserData.name}
          onChange={handleChange}
          labelText="Name"
        />
        <FormRow
          type="email"
          name="email"
          value={newUserData.email}
          onChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={newUserData.password}
          onChange={handleChange}
          labelText="Password"
        />
        <FormRow
          type="password"
          name="password_confirmation"
          value={newUserData.password_confirmation}
          onChange={handleChange}
          labelText="Password Confirmation"
        />
        <div className="submit-area">
          <button className="submit" type="submit">
            Sign Up
          </button>
        </div>
        <div className="toggle">
          <a href="#" onClick={toggleSignUp}>
            Sign In{" "}
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
