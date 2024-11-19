"use client";

import BestSellerCard from "@/components/BestSellerCard.tsx/BestSellerCard";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

const RelatedProductsSection: React.FC = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/all`
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch related products.");
        }
  
        const products = await response.json();
        console.log("Fetched products:", products); 
        setRelatedProducts(products);
      } catch (error) {
        setError("Failed to load related products.");
      }
    };
  
    fetchRelatedProducts();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-[1450px] w-full mx-auto mt-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex items-center justify-center">
          <h2 className="text-[23px] font-semibold mb-1">RELATED PRODUCTS</h2>
          <span className="absolute -bottom-1 w-1/2 border-b-2 border-[#A53E4C]"></span>
        </div>
        <span className="mt-4 text-[#666666] text-[18px]">
          Explore products similar to your interest!
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[3%]">
        {relatedProducts.map((product) => (
          <div key={product._id} className="relative">
            <BestSellerCard
              name={product.name}
              price={product.price}
              image={product.images?.[0] || "/placeholder-image.jpg"}
              productSlug={product.slug}
              isAuthenticated={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProductsSection;
