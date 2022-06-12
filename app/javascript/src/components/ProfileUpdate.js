import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { customFetch } from "../utils/axios";
import FormRow from "./FormRow";

const ProfileUpdate = ({ currentUser, fetchProfile, setShowUpdateForm }) => {
  const { setErrorMessage, errorShow } = useGlobalContext();
  const [userInfo, setUserInfo] = useState({
    user: {
      name: "",
      email: "",
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      user: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const edited = Object.fromEntries(
      Object.entries(userInfo).filter(([_, value]) => value !== "")
    );
    try {
      const response = await customFetch.put(`users/${currentUser.id}`, edited);
      fetchProfile();
      setShowUpdateForm(false);
      setUserInfo({
        name: "",
        email: "",
      });
      return response;
    } catch (error) {
      setErrorMessage(error.response.data[1]);
      errorShow();
    }
  };
  return (
    <section>
      <div className="profile-update-container">
        <div className="profile-update-content">
          <form className="profile-update-form" onSubmit={handleUpdate}>
            <FormRow
              type="text"
              name="name"
              value={userInfo.user.name}
              handleChange={handleChange}
              labelText="Name"
            />
            <FormRow
              type="email"
              name="email"
              value={userInfo.user.email}
              handleChange={handleChange}
              labelText="Email"
            />
            <div className="profile-update-submit">
              <button className="submit" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdate;
