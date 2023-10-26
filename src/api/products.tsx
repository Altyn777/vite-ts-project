interface Product {
  id: number;
  title: string;
}

interface ProductsResponse {
  products: Product[];
}

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(
    "https://dummyjson.com/products?limit=5&select=title,id"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json() as Promise<ProductsResponse>;
};
