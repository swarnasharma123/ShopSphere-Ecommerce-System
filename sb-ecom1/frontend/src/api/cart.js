import { apiClient } from "./client";

export async function addToCart(productId, quantity) {
  const response = await apiClient.post(`/carts/products/${productId}/quantity/${quantity}`);
  return response.data;
}

export async function fetchUserCart() {
  const response = await apiClient.get("/carts/users/cart");
  return response.data;
}

export async function fetchAllCarts() {
  const response = await apiClient.get("/carts");
  return response.data;
}

export async function updateCartItem(productId, operation) {
  const response = await apiClient.put(`/cart/products/${productId}/quantity/${operation}`);
  return response.data;
}

export async function deleteCartItem(cartId, productId) {
  const response = await apiClient.delete(`/carts/${cartId}/product/${productId}`);
  return response.data;
}
