import React from "react";
import ProductDetails from "./ProductDetails";
import InfoSection from "@/components/Detail/InfoSection/InfoSection";
import TabSection from "@/components/Detail/TabSection/TabSection";

async function fetchProduct(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function DetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product not found!</h1>
        <p className="text-gray-600">
          The product you are looking for does not exist.
        </p>
        <a href="/" className="text-[#A53E4C] hover:underline mt-4 block">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ProductDetails product={product} />
      <InfoSection />
      <TabSection />
    </div>
  );
}
