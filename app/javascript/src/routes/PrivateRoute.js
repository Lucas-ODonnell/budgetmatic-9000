import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, signedIn }) => {
  return signedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
