import React from "react";
import ProductDetails from "./ProductDetails";

async function fetchProduct(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json();
}

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProduct(params.slug);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <ProductDetails product={product} />
    </div>
  );
}
