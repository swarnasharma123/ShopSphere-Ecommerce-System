import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUserAddresses } from "../api/address";
import { placeOrder } from "../api/orders";
import { normalizeError } from "../utils/errorHelpers";

export default function CheckoutPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserAddresses()
      .then((data) => setAddresses(data || []))
        .catch((err) => setError(normalizeError(err)));
  }, []);

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setError(null);
    setMessage("");
    try {
      const payload = {
        addressId: Number(selectedAddress),
        pgName: "",
        pgPaymentId: "",
        pgStatus: "",
        pgResponseMessage: ""
      };
      const response = await placeOrder(paymentMethod, payload);
      setMessage(`Order created: #${response.orderId}`);
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-layout">
        <aside className="checkout-sidebar card">
          <h3>Manage My Account</h3>
          <div className="sidebar-section">
            <span className="muted">My Orders</span>
            <div className="sidebar-links">
              <NavLink to="/account/orders">My Orders</NavLink>
              <NavLink to="/account/returns">My Returns</NavLink>
              <NavLink to="/account/cancellations">My Cancellations</NavLink>
            </div>
          </div>
          <div className="sidebar-section">
            <span className="muted">My Profile</span>
            <div className="sidebar-links">
              <NavLink to="/addresses">Address Book</NavLink>
              <NavLink to="/account/payment-options">Payment Options</NavLink>
            </div>
          </div>
        </aside>

        <div className="checkout-content card">
          <div className="row">
            <h2>Checkout</h2>
            <span className="muted">Review and place your order</span>
          </div>

          {error && (
            <div className="error">
              {error.message}
              <div className="error-details">{error.suggestion}</div>
            </div>
          )}
          {message && <div className="success">{message}</div>}

          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="form-row">
              <label className="muted">Delivery address</label>
              <select
                className="input"
                value={selectedAddress}
                onChange={(event) => setSelectedAddress(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select delivery address
                </option>
                {addresses.map((address) => (
                  <option key={address.addressId} value={address.addressId}>
                    {address.street}, {address.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="muted">Payment method</label>
              <select
                className="input"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="CARD">Card</option>
                <option value="UPI">UPI</option>
              </select>
            </div>

            <div className="form-actions">
              <button className="btn outline pill" type="button">
                Cancel
              </button>
              <button className="btn pill" type="submit">
                Place order
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
