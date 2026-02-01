import { apiClient } from "./client";

export async function login(payload) {
  const response = await apiClient.post("/auth/signin", payload);
  return response.data;
}

export async function register(payload) {
  const response = await apiClient.post("/auth/signup", payload);
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await apiClient.get("/auth/user");
  return response.data;
}

export async function requestPasswordReset(payload) {
  const response = await apiClient.post("/auth/forgot-password", payload);
  return response.data;
}

export async function verifyOtp(payload) {
  const response = await apiClient.post("/auth/verify-otp", payload);
  return response.data;
}

export async function resetPassword(payload) {
  const response = await apiClient.post("/auth/reset-password", payload);
  return response.data;
}

export async function logout() {
  const response = await apiClient.post("/auth/signout");
  return response.data;
}
