import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AddressesPage from "./pages/AddressesPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AdminCategoriesPage from "./pages/AdminCategoriesPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetSuccessPage from "./pages/ResetSuccessPage.jsx";
import StaticPage from "./pages/StaticPage.jsx";
import AccessDeniedPage from "./pages/AccessDeniedPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ReturnsPage from "./pages/ReturnsPage.jsx";
import CancellationsPage from "./pages/CancellationsPage.jsx";
import AccountProfilePage from "./pages/AccountProfilePage.jsx";
import PaymentOptionsPage from "./pages/PaymentOptionsPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-success" element={<ResetSuccessPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route
            path="/wishlist"
            element={
              <StaticPage
                title="Wishlist"
                description="Save items you love and revisit them anytime."
              />
            }
          />
          <Route
            path="/support/contact"
            element={
              <StaticPage
                title="Contact"
                description="We are here to help with any questions about your order."
              />
            }
          />
          <Route
            path="/support/faqs"
            element={
              <StaticPage
                title="FAQs"
                description="Find answers to common questions about shopping and delivery."
              />
            }
          />
          <Route
            path="/support/returns"
            element={
              <StaticPage
                title="Returns"
                description="Learn how to initiate a return or exchange."
              />
            }
          />
          <Route
            path="/support/shipping"
            element={
              <StaticPage
                title="Shipping"
                description="Explore shipping methods, timelines, and costs."
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <StaticPage
                title="Privacy Policy"
                description="How we collect, use, and protect your information."
              />
            }
          />
          <Route
            path="/terms"
            element={
              <StaticPage
                title="Terms of Use"
                description="Review the terms that apply to our services."
              />
            }
          />
          <Route
            path="/about"
            element={
              <StaticPage
                title="About Us"
                description="Learn more about SB Shop and our mission."
              />
            }
          />
          <Route
            path="/careers"
            element={
              <StaticPage
                title="Careers"
                description="Join our team and help build the future of commerce."
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addresses"
            element={
              <ProtectedRoute>
                <AddressesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/returns"
            element={
              <ProtectedRoute>
                <ReturnsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/cancellations"
            element={
              <ProtectedRoute>
                <CancellationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/profile"
            element={
              <ProtectedRoute>
                <AccountProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/payment-options"
            element={
              <ProtectedRoute>
                <PaymentOptionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} denyRedirect="/access-denied">
                <AdminCategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
