import React from "react";
import { NavLink } from "react-router-dom";
import { BRAND_INITIALS, BRAND_NAME } from "../config/brand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <NavLink className="brand" to="/">
            <span className="brand-mark">{BRAND_INITIALS}</span>
            <span>{BRAND_NAME}</span>
          </NavLink>
          <p className="muted">
            Discover curated products, trusted sellers, and fast delivery.
          </p>
          <div className="footer-contact">
            <a href="mailto:support@sbshop.com">support@sbshop.com</a>
            <a href="tel:+918000123456">+91 8000 123 456</a>
            <div>Rourkela, Odisha</div>
          </div>
        </div>

        <div>
          <h4>Account</h4>
          <ul>
            <li>
              <NavLink to="/account/profile">My Account</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login / Register</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/wishlist">Wishlist</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            <li>
              <NavLink to="/support/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/support/faqs">FAQs</NavLink>
            </li>
            <li>
              <NavLink to="/support/returns">Returns</NavLink>
            </li>
            <li>
              <NavLink to="/support/shipping">Shipping</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/privacy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/terms">Terms of Use</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/careers">Careers</NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 SB Shop. All rights reserved.</span>
        <span>Built with ❤ for modern commerce.</span>
      </div>
    </footer>
  );
}
