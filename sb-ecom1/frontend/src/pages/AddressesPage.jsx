import React, { useEffect, useState } from "react";
import { createAddress, deleteAddress, fetchUserAddresses } from "../api/address";
import { normalizeError } from "../utils/errorHelpers";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    street: "",
    buildingName: "",
    city: "",
    state: "",
    country: "",
    pincode: ""
  });
  const [error, setError] = useState(null);

  async function loadAddresses() {
    try {
      const data = await fetchUserAddresses();
      setAddresses(data || []);
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  useEffect(() => {
    loadAddresses();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    try {
      await createAddress(form);
      setForm({ street: "", buildingName: "", city: "", state: "", country: "", pincode: "" });
      await loadAddresses();
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  async function handleDelete(addressId) {
    setError(null);
    try {
      await deleteAddress(addressId);
      await loadAddresses();
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  return (
    <section>
      <h2>Addresses</h2>
      {error && (
        <div className="error">
          {error.message}
          <div className="error-details">{error.suggestion}</div>
        </div>
      )}
      <form className="form section" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Street"
          value={form.street}
          onChange={(event) => setForm({ ...form, street: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Building"
          value={form.buildingName}
          onChange={(event) => setForm({ ...form, buildingName: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="City"
          value={form.city}
          onChange={(event) => setForm({ ...form, city: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="State"
          value={form.state}
          onChange={(event) => setForm({ ...form, state: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Country"
          value={form.country}
          onChange={(event) => setForm({ ...form, country: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Pincode"
          value={form.pincode}
          onChange={(event) => setForm({ ...form, pincode: event.target.value })}
          required
        />
        <button className="btn" type="submit">
          Add address
        </button>
      </form>

      <div className="section">
        <h3>Saved addresses</h3>
        <div className="grid">
          {addresses.map((address) => (
            <div className="card" key={address.addressId}>
              <div>{address.street}</div>
              <div>{address.buildingName}</div>
              <div>
                {address.city}, {address.state}
              </div>
              <div>
                {address.country} - {address.pincode}
              </div>
              <button className="btn danger" onClick={() => handleDelete(address.addressId)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
