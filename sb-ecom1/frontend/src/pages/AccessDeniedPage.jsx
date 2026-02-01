import React from "react";
import { NavLink } from "react-router-dom";

export default function AccessDeniedPage() {
  return (
    <section className="page">
      <div className="page-header">
        <h2>Access denied</h2>
        <p className="muted">
          You do not have permission to view this page.
        </p>
      </div>
      <div className="page-card">
        <p className="muted">Please return to a safe page or contact support.</p>
        <div className="auth-actions">
          <NavLink className="btn pill" to="/">
            Go to home
          </NavLink>
          <NavLink className="btn outline pill" to="/support/contact">
            Contact support
          </NavLink>
        </div>
      </div>
    </section>
  );
}
