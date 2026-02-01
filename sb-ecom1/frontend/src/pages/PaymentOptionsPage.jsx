import React, { useState } from "react";

export default function PaymentOptionsPage() {
  const [form, setForm] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingAddress: "",
    isDefault: false
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="account-page">
      <h2>Payment Options</h2>
      <p className="muted">Manage your saved payment methods here.</p>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="muted">Cardholder name</label>
          <input
            className="input"
            name="cardholderName"
            placeholder="John Doe"
            value={form.cardholderName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label className="muted">Card number</label>
          <input
            className="input"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grid">
          <div className="form-row">
            <label className="muted">Expiry</label>
            <input
              className="input"
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label className="muted">CVV</label>
            <input
              className="input"
              name="cvv"
              placeholder="123"
              value={form.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <label className="muted">Billing address</label>
          <input
            className="input"
            name="billingAddress"
            placeholder="Street, City, State"
            value={form.billingAddress}
            onChange={handleChange}
          />
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
          />
          Set as default payment method
        </label>
        <div className="form-actions">
          <button className="btn outline pill" type="button">
            Cancel
          </button>
          <button className="btn pill" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </section>
  );
}
