import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/AppContext";
import { ProfileUpdate } from "../components";
import { customFetch } from "../utils/axios";
import { removeUserFromLocalStorage } from "../utils/localStorage";

const Profile = () => {
  const { FontAwesomeIcon, setSignedIn, setShowWarning, setDeleteFunction } =
    useGlobalContext();
  const [currentUser, setCurrentUser] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await customFetch.get("current_user");
      setCurrentUser(response.data);
    } catch (error) {
      setSignedIn(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await customFetch.delete(`users/${currentUser.id}`);
      setSignedIn(false);
      removeUserFromLocalStorage();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-top-row">
            <div className="profile-base-info">
              <p>
                <span>Logged in as:</span> {currentUser.name}
              </p>
              <p>
                <span>Email:</span> {currentUser.email}
              </p>
            </div>
            <div className="delete-profile">
              <button
                onClick={() => {
                  setShowWarning(true);
                  setDeleteFunction(() => () => handleDelete());
                }}
              >
                Delete Profile
              </button>
            </div>
          </div>
          <div
            className="update-profile"
            onClick={() => {
              setShowUpdateForm(!showUpdateForm);
            }}
          >
            <div className="icon">
              {showUpdateForm ? (
                <FontAwesomeIcon icon="fas fa-caret-down" />
              ) : (
                <FontAwesomeIcon icon="fas fa-caret-right" />
              )}
            </div>
            <p>Update Profile</p>
          </div>
          {showUpdateForm ? (
            <ProfileUpdate
              {...{ currentUser, fetchProfile, setShowUpdateForm }}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
