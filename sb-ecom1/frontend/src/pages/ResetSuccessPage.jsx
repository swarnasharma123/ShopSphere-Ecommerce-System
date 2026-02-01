import React from "react";
import { NavLink } from "react-router-dom";

export default function ResetSuccessPage() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-visual" />
        <div className="auth-panel">
          <h2>Password updated</h2>
          <p className="muted">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <div className="auth-actions">
            <NavLink to="/login" className="btn pill">
              Go to login
            </NavLink>
            <NavLink to="/" className="btn outline pill">
              Continue shopping
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
