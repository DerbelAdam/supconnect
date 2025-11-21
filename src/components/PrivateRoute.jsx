// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const email = localStorage.getItem("email");

  return currentUser  ? children : <Navigate to="/login" />;
}