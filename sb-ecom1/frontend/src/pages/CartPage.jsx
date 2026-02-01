import React, { useEffect, useState } from "react";
import { deleteCartItem, fetchUserCart, updateCartItem } from "../api/cart";
import { normalizeError } from "../utils/errorHelpers";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);

  async function loadCart() {
    setError(null);
    try {
      const data = await fetchUserCart();
      setCart(data);
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleQuantity(productId, operation) {
    try {
      const data = await updateCartItem(productId, operation);
      setCart(data);
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  async function handleDelete(productId) {
    if (!cart) return;
    try {
      await deleteCartItem(cart.cartId, productId);
      await loadCart();
    } catch (err) {
      setError(normalizeError(err));
    }
  }

  if (error) {
    return (
      <div className="error">
        {error.message}
        <div className="error-details">{error.suggestion}</div>
      </div>
    );
  }

  if (!cart) {
    return <div className="notice">Loading cart...</div>;
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h2>Your cart</h2>
        <button className="btn outline pill">Return to shop</button>
      </div>

      {cart.products.length === 0 ? (
        <div className="notice section">Cart is empty.</div>
      ) : (
        <div className="cart-layout">
          <div className="cart-table card">
            <div className="cart-row cart-head">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
            {cart.products.map((product) => (
              <div className="cart-row" key={product.productId}>
                <div className="cart-product">
                  <span className="cart-name">{product.productName}</span>
                </div>
                <span>₹{product.specialPrice}</span>
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantity(product.productId, "delete")}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantity(product.productId, "add")}
                  >
                    +
                  </button>
                </div>
                <div className="cart-actions">
                  <span>₹{product.specialPrice * product.quantity}</span>
                  <button
                    className="link danger"
                    onClick={() => handleDelete(product.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-sidebar">
            <div className="coupon card">
              <div className="coupon-row">
                <input className="input" placeholder="Coupon code" />
                <button className="btn pill">Apply coupon</button>
              </div>
            </div>
            <div className="cart-summary card">
              <h3>Cart total</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cart.totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{cart.totalPrice}</span>
              </div>
              <button className="btn pill">Proceed to checkout</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
