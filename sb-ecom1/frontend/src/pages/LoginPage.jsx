import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { normalizeError } from "../utils/errorHelpers";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-visual" />
        <div className="auth-panel">
          <h2>Log in to Exclusive</h2>
          <p className="muted">Enter your details below</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Email or Username"
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              autoComplete="username"
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              autoComplete="current-password"
              required
            />
            <div className="auth-actions">
              <button className="btn pill" type="submit">
                Log in
              </button>
              <NavLink className="link" to="/forgot-password">
                Forgot Password?
              </NavLink>
            </div>
            {error && (
              <div className="error">
                {error.message}
                <div className="error-details">{error.suggestion}</div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
