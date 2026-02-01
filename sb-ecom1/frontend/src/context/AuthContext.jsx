import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser, login as loginRequest, logout as logoutRequest } from "../api/auth";
import { setAuthToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("sb_ecom_token");
    if (token) {
      setAuthToken(token);
    }
    fetchCurrentUser()
      .then((data) => {
        if (isMounted) setUser(data);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  async function login(payload) {
    const data = await loginRequest(payload);
    setUser(data);
    if (data?.jwtToken) {
      localStorage.setItem("sb_ecom_token", data.jwtToken);
      setAuthToken(data.jwtToken);
    }
    return data;
  }

  async function logout() {
    await logoutRequest();
    setUser(null);
    localStorage.removeItem("sb_ecom_token");
    setAuthToken(null);
  }

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
