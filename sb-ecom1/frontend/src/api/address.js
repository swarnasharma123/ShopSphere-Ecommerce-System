import { apiClient } from "./client";

export async function fetchUserAddresses() {
  const response = await apiClient.get("/users/addresses");
  return response.data;
}

export async function createAddress(payload) {
  const response = await apiClient.post("/addresses", payload);
  return response.data;
}

export async function deleteAddress(addressId) {
  const response = await apiClient.delete(`/addresses/${addressId}`);
  return response.data;
}
