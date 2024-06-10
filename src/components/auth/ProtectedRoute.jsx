import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, redirectTo }) {
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
