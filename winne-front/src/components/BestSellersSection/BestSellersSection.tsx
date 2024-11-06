"use client";
import React, { useEffect, useState } from "react";
import { fetchBestSellers } from "@/lib/fetchers";
import BestSellerCard from "../BestSellerCard.tsx/BestSellerCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

const BestSellersSection: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBestSellers = async () => {
      try {
        const products = await fetchBestSellers();
        setBestSellers(products);
      } catch {
        setError("Failed to load best sellers.");
      }
    };

    getBestSellers();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-[1450px] w-full mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex items-center justify-center">
          <h2 className="text-[23px] font-semibold mb-1">BEST SELLER</h2>
          <span className="absolute -bottom-1 w-1/2 border-b-2 border-[#A53E4C]"></span>
        </div>
        <span className="mt-4 text-[#666666] text-[18px]">
          Best Seller Product This Week!
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[3%]">
        {bestSellers.map((product) => (
          <BestSellerCard
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.images?.[0] || "/placeholder-image.jpg"}
            productSlug={product.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
