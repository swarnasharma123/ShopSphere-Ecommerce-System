import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "/api";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export function setAuthToken(token) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const message =
      data?.message ||
      data?.error ||
      error.message ||
      "Request failed";

    const err = new Error(message);
    err.status = status;
    err.details = data;
    err.suggestion = deriveSuggestion(status, data);
    return Promise.reject(err);
  }
);

function deriveSuggestion(status, data) {
  if (status === 400) {
    if (data && typeof data === "object") {
      const keys = Object.keys(data);
      if (keys.length > 0) {
        return `Check these fields: ${keys.join(", ")}.`;
      }
    }
    return "Please check your input and try again.";
  }
  if (status === 401) return "Please login to continue.";
  if (status === 403) return "Your account does not have access to this action.";
  if (status === 404) return "The requested resource was not found.";
  if (status >= 500) return "Server error. Please try again later.";
  return "Please try again.";
}
