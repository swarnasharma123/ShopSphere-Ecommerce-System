import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset, resetPassword, verifyOtp } from "../api/auth";
import { normalizeError } from "../utils/errorHelpers";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState("email");
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSendOtp(event) {
    event.preventDefault();
    setError(null);
    setMessage("");
    try {
      await requestPasswordReset({ email: form.email });
      setMessage("OTP sent to your email. Please check your inbox.");
      setStep("otp");
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    setError(null);
    setMessage("");
    try {
      await verifyOtp({ email: form.email, otp: form.otp });
      setMessage("OTP verified. You can set a new password.");
      setStep("reset");
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setError(null);
    setMessage("");
    try {
      await resetPassword({ email: form.email, otp: form.otp, newPassword: form.newPassword });
      navigate("/reset-success");
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-visual" />
        <div className="auth-panel">
          <h2>Reset your password</h2>
          <p className="muted">Verify your email with an OTP to continue.</p>

          {step === "email" && (
            <form className="auth-form" onSubmit={handleSendOtp}>
              <input
                className="input"
                type="email"
                placeholder="Verified email address"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                autoComplete="email"
                required
              />
              <button className="btn pill" type="submit">
                Send OTP
              </button>
            </form>
          )}

          {step === "otp" && (
            <form className="auth-form" onSubmit={handleVerifyOtp}>
              <input
                className="input"
                type="email"
                placeholder="Verified email address"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                autoComplete="email"
                required
              />
              <input
                className="input"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={(event) => setForm({ ...form, otp: event.target.value })}
                autoComplete="one-time-code"
                required
              />
              <button className="btn pill" type="submit">
                Verify OTP
              </button>
              <button className="link" type="button" onClick={() => setStep("email")}
              >
                Resend OTP
              </button>
            </form>
          )}

          {step === "reset" && (
            <form className="auth-form" onSubmit={handleResetPassword}>
              <input
                className="input"
                type="email"
                placeholder="Verified email address"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                autoComplete="email"
                required
              />
              <input
                className="input"
                placeholder="OTP"
                value={form.otp}
                onChange={(event) => setForm({ ...form, otp: event.target.value })}
                autoComplete="one-time-code"
                required
              />
              <input
                className="input"
                type="password"
                placeholder="New password"
                value={form.newPassword}
                onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
                autoComplete="new-password"
                required
              />
              <button className="btn pill" type="submit">
                Update password
              </button>
            </form>
          )}

          {message && <div className="success">{message}</div>}
          {error && (
            <div className="error">
              {error.message}
              <div className="error-details">{error.suggestion}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
