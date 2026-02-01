import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { normalizeError } from "../utils/errorHelpers";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setMessage("");
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password
    };
    try {
      await register(payload);
      setMessage("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-visual" />
        <div className="auth-panel">
          <h2>Create an account</h2>
          <p className="muted">Enter your details below</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Name"
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              autoComplete="name"
              required
            />
            <input
              className="input"
              type="email"
              placeholder="Email or Phone Number"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              autoComplete="email"
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              autoComplete="new-password"
              required
            />
            <div className="auth-actions">
              <button className="btn pill" type="submit">
                Create account
              </button>
              <button className="btn outline pill" type="button">
                Sign up with Google
              </button>
            </div>
            {message && <div className="success">{message}</div>}
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
