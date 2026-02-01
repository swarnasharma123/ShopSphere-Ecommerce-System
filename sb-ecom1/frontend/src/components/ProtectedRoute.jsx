import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, allowedRoles = [], denyRedirect = "/" }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="notice">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const roles = Array.isArray(user.roles)
      ? user.roles
      : Array.isArray(user.role)
      ? user.role
      : user.role
      ? [user.role]
      : [];
    const normalizedAllowed = allowedRoles.map((role) =>
      String(role || "").toUpperCase()
    );
    const isAllowed = roles
      .map((role) => String(role || "").toUpperCase())
      .some((role) => normalizedAllowed.includes(role));
    if (!isAllowed) {
      return <Navigate to={denyRedirect} replace />;
    }
  }

  return children;
}
