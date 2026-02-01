import { apiClient } from "./client";

export async function placeOrder(paymentMethod, payload) {
  const response = await apiClient.post(`/order/users/payments/${paymentMethod}`, payload);
  return response.data;
}
