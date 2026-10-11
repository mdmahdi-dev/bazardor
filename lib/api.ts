
const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data = await response.json();

return data;
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  const data = await response.json();
  return data;
}

export async function getProduct(id: string) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load product");
  }

  return response.json();
}