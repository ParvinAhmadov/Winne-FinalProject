"use client";

import React, { useEffect, useState } from "react";
import BestSellerCard from "@/components/BestSellerCard.tsx/BestSellerCard";
import { BiLoaderCircle } from "react-icons/bi";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

const HotDealSection: React.FC = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/paginated?page=1&limit=4`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch related products.");
      }

      const data = await response.json();
      setRelatedProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-[1450px] w-full mx-auto mt-10">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold tracking-widest mb-2 text-black">
          HOT DEAL
        </h3>
        <div className="w-[5%] h-[2px] bg-[#A53E4C]"></div>
        <p className="mt-4 text-[16px] text-[#6e6e6e]">
          Don't Miss Today's Featured Deals
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[3%]">
        {relatedProducts.map((product) => (
          <BestSellerCard
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.images?.[0] || "/placeholder-image.jpg"}
            productSlug={product.slug}
            isAuthenticated={true}
            productId={product._id}
          />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <BiLoaderCircle className="animate-spin text-2xl text-[#A53E4C]" />
        </div>
      )}
    </section>
  );
};

export default HotDealSection;
