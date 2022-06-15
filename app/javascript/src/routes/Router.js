import React from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import { Main, Devise, Profile, ErrorPage, LandingPage } from "../pages";

const Router = () => {
  return (
    <Routes>
      <Route path="landing" element={<LandingPage />} />
      <Route path="signin" element={<Devise />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <SharedLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Main />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
