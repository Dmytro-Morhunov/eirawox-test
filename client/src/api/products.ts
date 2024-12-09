import { baseUrl } from "./config";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  location: string;
  description: string;
  image: string;
}

export interface GetProductsParams {
  category?: string;
  location?: string;
  name?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const getProductById = async (productId: number) => {
  const response = await fetch(`${baseUrl}/products/${productId}`, {
    method: "GET",
  });
  return (await response.json()) as Product;
};

export const getProducts = async (params: GetProductsParams) => {
  const url = new URL(`${baseUrl}/products`);
  for (const key in params) {
    const value = params[key];
    if (value && value !== "Всі") {
      url.searchParams.set(key, value);
    }
  }
  const response = await fetch(url, {
    method: "GET",
  });
  return (await response.json()) as Product[];
};
