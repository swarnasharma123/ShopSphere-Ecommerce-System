import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { BRAND_INITIALS, BRAND_NAME } from "../config/brand";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isAdmin = Array.isArray(user?.roles)
    ? user.roles.map((role) => String(role).toUpperCase()).includes("ROLE_ADMIN")
    : String(user?.role || "").toUpperCase() === "ROLE_ADMIN";
  const userEmail = useMemo(() => {
    if (!user) return "";
    if (user.email) return user.email;
    if (user.username && String(user.username).includes("@")) return user.username;
    return "Email not available";
  }, [user]);
  const userInitial = useMemo(() =>
    (user?.username || "U").charAt(0).toUpperCase(), [user]
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  function handleTriggerKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMenuOpen((prev) => !prev);
    }
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  return (
    <header className="navbar">
      <div className="inner">
        <div className="nav-left">
          <Link className="brand" to="/" aria-label={`${BRAND_NAME} home`}>
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 8H18L16.6 19H7.4L6 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M9 8V6.6C9 5.2 10.2 4 11.6 4H12.4C13.8 4 15 5.2 15 6.6V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </span>
            <span>{BRAND_NAME}</span>
          </Link>
        </div>
        <div className="nav-search">
          <span className="search-icon">⌕</span>
          <input className="nav-input" placeholder="Search products..." />
        </div>
        <nav className="nav-links">
          <NavLink to="/">Discover</NavLink>
          {user && <NavLink to="/cart">Cart</NavLink>}
          {user && <NavLink to="/addresses">Addresses</NavLink>}
          {user && <NavLink to="/checkout">Checkout</NavLink>}
          {isAdmin && <NavLink to="/admin/categories">Admin</NavLink>}
        </nav>
        <div className="nav-actions">
          {user ? (
            <div
              className="profile-menu"
              ref={menuRef}
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                className="profile-trigger"
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls="profile-menu"
                onClick={() => setMenuOpen((prev) => !prev)}
                onKeyDown={handleTriggerKeyDown}
              >
                <span className="profile-avatar">{userInitial}</span>
                <span className="profile-name">{user.username}</span>
                <span className="profile-chevron">▾</span>
              </button>
              <div
                id="profile-menu"
                className={`profile-dropdown ${menuOpen ? "open" : ""}`}
                role="menu"
                aria-label="Profile menu"
              >
                <div className="profile-header">
                  <div className="profile-avatar lg">{userInitial}</div>
                  <div>
                    <div className="profile-title">{user.username}</div>
                    <div className="profile-email">{userEmail}</div>
                  </div>
                </div>
                <div className="profile-divider" />
                <NavLink
                  to="/account/profile"
                  className="profile-item"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile / Account
                </NavLink>
                <NavLink
                  to="/account/orders"
                  className="profile-item"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </NavLink>
                {isAdmin && (
                  <NavLink
                    to="/admin/categories"
                    className="profile-item"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Panel
                  </NavLink>
                )}
                <button
                  className="profile-item danger"
                  type="button"
                  role="menuitem"
                  onClick={async () => {
                    setMenuOpen(false);
                    await handleLogout();
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn outline pill">
                Log in
              </NavLink>
              <NavLink to="/register" className="btn pill">
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
