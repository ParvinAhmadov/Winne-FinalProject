export const fetchAllProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/all`
  );
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const fetchBestSellers = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-sellers`
  );
  if (!response.ok) throw new Error("Failed to fetch best sellers.");
  return response.json();
};
