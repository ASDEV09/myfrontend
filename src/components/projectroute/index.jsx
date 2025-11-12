import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Agar token hi nahi hai to login par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role match nahi karta
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />; // unauthorized users ko home par bhej do
  }

  return children;
}

export default ProtectedRoute;
