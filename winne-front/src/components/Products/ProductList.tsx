"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FilterState, Product } from "@/types";
import { debounce } from "lodash";
import BestSellerCard from "../BestSellerCard.tsx/BestSellerCard";
import ClipLoader from "react-spinners/ClipLoader";

interface ProductListProps {
  filters: FilterState;
  sortOption?: string;
  isFilterVisible: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  filters,
  sortOption = "default",
  isFilterVisible,
}) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const router = useRouter();

  const updateUrlParams = useCallback(() => {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        queryParams.set(key, value.join(","));
      } else if (typeof value === "string" && value.trim() !== "") {
        queryParams.set(key, value);
      } else {
        queryParams.delete(key);
      }
    });

    queryParams.set("page", String(page));
    queryParams.set("limit", String(limit));
    queryParams.set("sort", sortOption);

    router.push(`?${queryParams.toString()}`);
  }, [filters, page, sortOption, router]);

  useEffect(() => {
    updateUrlParams();
  }, [filters, page, sortOption, updateUrlParams]);

  useEffect(() => {
    updateUrlParams();
  }, [filters, page, sortOption, updateUrlParams]);

  const fetchFilteredProducts = useCallback(
    debounce(async () => {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length) {
            queryParams.append(key, value.join(","));
          } else if (value) {
            queryParams.append(key, String(value));
          }
        });

        queryParams.append("page", String(page));
        queryParams.append("limit", String(limit));
        queryParams.append("sort", sortOption);

        const response = await fetch(`/api/products/all/filter?${queryParams}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        setRelatedProducts(data.data || []);
        setHasMore(data.currentPage < data.totalPages);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [filters, page, limit, sortOption]
  );

  useEffect(() => {
    fetchFilteredProducts();
    return fetchFilteredProducts.cancel;
  }, [fetchFilteredProducts]);

  useEffect(() => {
    fetchFilteredProducts();
    return fetchFilteredProducts.cancel;
  }, [fetchFilteredProducts]);

  const handleNextPage = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="product-list-container max-w-[1450px] w-full mx-auto ">
      <h2 className="flex items-center tracking-widest gap-2">
        {" "}
        <img
          className="w-[26px] h-[26px]"
          src="https://winne-store-demo.myshopify.com/cdn/shop/t/2/assets/icon-bestseller.svg"
          alt=""
        />
        PRODUCTS
      </h2>
      <div
        className={`grid gap-6 transition-all duration-300 ${
          isFilterVisible
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {isLoading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <ClipLoader color="#A53E4C" size={60} />
          </div>
        ) : (
          relatedProducts.map((product) => (
            <BestSellerCard
              key={product._id}
              name={product.name}
              price={product.price}
              image={product.images?.[0] || "/placeholder-image.jpg"}
              productSlug={product.slug}
              isAuthenticated={true}
              productId={product._id}
            />
          ))
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="flex justify-center gap-4 mt-6 ml-[100%] md:ml-0">
          {page > 1 && (
            <button
              onClick={handlePreviousPage}
              className="flex items-center px-4 py-2 bg-[#A53E4C] text-white tracking-widest hover:bg-black transition ease-in-out duration-200"
            >
              PREVIOUS
            </button>
          )}
          {hasMore && (
            <button
              onClick={handleNextPage}
              className="flex items-center px-4 py-2 bg-[#A53E4C] text-white tracking-widest hover:bg-black transition ease-in-out duration-200"
            >
              NEXT
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
