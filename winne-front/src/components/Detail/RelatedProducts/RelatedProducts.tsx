"use client";
import BestSellerCard from "@/components/BestSellerCard.tsx/BestSellerCard";
import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { MdOutlineNextPlan } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { RiDeleteRow } from "react-icons/ri";
import { VscDebugStepBack } from "react-icons/vsc";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

const RelatedProductsSection: React.FC = () => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(4);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const fetchPaginatedProducts = async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/paginated?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch related products.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching paginated products:", error);
      throw error;
    }
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPaginatedProducts(page, limit);
      setRelatedProducts(data.products);
      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      setError("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, limit]);

  const handleNextPage = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 4);
  };

  const handleReduceLimit = () => {
    setLimit((prev) => Math.max(4, prev - 4));
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-[1450px] w-full mx-auto mt-10">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold tracking-widest mb-2 text-black">
          RELATED PRODUCTS
        </h3>
        <div className="w-[10%] h-[2px] bg-[#A53E4C]"></div>
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
          />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <BiLoaderCircle className="animate-spin text-2xl text-[#A53E4C]" />
        </div>
      )}

      <div className="flex justify-center gap-4 mt-6">
        {page > 1 && (
          <button
            onClick={handlePreviousPage}
            className="flex items-center px-4 py-2 bg-[#A53E4C] text-white tracking-widest  hover:bg-black transition ease-in-out duration-200"
          >
            <VscDebugStepBack className="mr-2 text-lg" /> PREVIOUS PAGE
          </button>
        )}
        {hasMore && (
          <button
            onClick={handleNextPage}
            className="flex items-center px-4 py-2 bg-[#A53E4C] text-white tracking-widest  hover:bg-black transition ease-in-out duration-200"
          >
            NEXT PAGE <MdOutlineNextPlan className="ml-2 text-lg" />
          </button>
        )}
        <button
          onClick={handleLoadMore}
          className="flex items-center px-4 py-2 bg-black text-white  tracking-widest hover:bg-[#A53E4C] transition ease-in-out duration-200"
        >
          <CiCircleMore className="mr-2 text-lg" /> LOAD MORE
        </button>
        {limit > 4 && (
          <button
            onClick={handleReduceLimit}
            className="flex items-center px-4 py-2 bg-[#A53E4C] text-white hover:bg-black transition ease-in-out duration-200"
          >
            <RiDeleteRow className="mr-2 text-lg" /> Reduce Items
          </button>
        )}
      </div>
    </section>
  );
};

export default RelatedProductsSection;
