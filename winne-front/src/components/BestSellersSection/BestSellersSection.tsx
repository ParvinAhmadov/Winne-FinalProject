"use client";
import React, { useEffect, useState } from "react";
import { fetchBestSellers } from "@/lib/fetchers";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBestSellers = async () => {
      try {
        const products = await fetchBestSellers();
        setBestSellers(products);
        setLoadingStates(Array(products.length).fill(true));
      } catch {
        setError("Failed to load best sellers.");
      }
    };

    getBestSellers();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => {
      const updatedLoadingStates = [...prev];
      updatedLoadingStates[index] = false;
      return updatedLoadingStates;
    });
  };

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
        {bestSellers.map((product, index) => (
          <div key={product._id} className="relative">
            {loadingStates[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <ClipLoader color="#00fcff" size={40} />
              </div>
            )}
            <BestSellerCard
              name={product.name}
              price={product.price}
              image={product.images?.[0] || "/placeholder-image.jpg"}
              productSlug={product.slug}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
