import { apiClient } from "./client";

export async function fetchCategories(params) {
  const response = await apiClient.get("/public/categories", { params });
  return response.data;
}

export async function createCategory(payload) {
  const response = await apiClient.post("/public/categories", payload);
  return response.data;
}

export async function deleteCategory(categoryId) {
  const response = await apiClient.delete(`/admin/categories/${categoryId}`);
  return response.data;
}

export async function fetchProducts(params) {
  const response = await apiClient.get("/public/products", { params });
  return response.data;
}

export async function fetchProductsByCategory(categoryId, params) {
  const response = await apiClient.get(`/public/categories/${categoryId}/products`, { params });
  return response.data;
}

export async function searchProducts(keyword, params) {
  const response = await apiClient.get(`/public/products/keyword/${keyword}`, { params });
  return response.data;
}

export function resolveImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return "";
}

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%2394a3b8'>Image unavailable</text></svg>";

export async function uploadProductImage(productId, file) {
  const formData = new FormData();
  formData.append("image", file);
  const response = await apiClient.put(`/products/${productId}/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
}
