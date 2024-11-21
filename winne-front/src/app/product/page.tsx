"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/Products/FilterSidebar";
import ProductList from "@/components/Products/ProductList";
import SortingDropdown from "@/components/Products/SortingDropdown";
import { FilterState } from "@/types";
import { CiFilter } from "react-icons/ci";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    priceRange: searchParams.get("priceRange")?.split(",") || [],
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    size: searchParams.get("size")?.split(",") || [],
    tags: searchParams.get("tags")?.split(",") || [],
    color: searchParams.get("color")?.split(",") || [],
  });
  const [sortOption, setSortOption] = useState<string>(
    searchParams.get("sort") || "default"
  );

  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  const updateUrlWithFilters = useCallback(() => {
    const queryParams = new URLSearchParams();

    if (Array.isArray(filters.priceRange) && filters.priceRange.length > 0) {
      queryParams.set("priceRange", filters.priceRange.join(","));
    }
    if (Array.isArray(filters.size) && filters.size.length > 0) {
      queryParams.set("size", filters.size.join(","));
    }
    if (Array.isArray(filters.tags) && filters.tags.length > 0) {
      queryParams.set("tags", filters.tags.join(","));
    }
    if (Array.isArray(filters.color) && filters.color.length > 0) {
      queryParams.set("color", filters.color.join(","));
    }

    if (sortOption) {
      queryParams.set("sort", sortOption);
    }

    router.replace(`?${queryParams.toString()}`);
  }, [filters, sortOption, router]);

  useEffect(() => {
    updateUrlWithFilters();
  }, [filters, sortOption, updateUrlWithFilters]);

  return (
    <div>
      
      <div className="relative w-full h-[146px]">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Wishlist Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[46px] mb-2">Products</h1>
          <p className="text-white text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[10px]" />
            </span>
            Products
          </p>
        </div>
      </div>

      
      <div className="products-page max-w-[1450px] mx-auto mt-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <button
            className="hover:bg-[#A53E4C] hover:border-white transition ease duration-150 hover:text-white flex items-center tracking-widest text-black border-2 border-black px-4 py-2 gap-2"
            onClick={() => setIsFilterVisible((prev) => !prev)}
          >
            <CiFilter className="text-[25px]" /> FILTER
          </button>
          <SortingDropdown
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>

        <div className="flex mr-[84%] lg:mr-0">
          <AnimatePresence>
            {isFilterVisible && (
              <motion.aside
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full h-full bg-white lg:static lg:w-1/4 lg:h-auto p-4 z-20 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">FILTERS</h2>
                  <button
                    className="lg:hidden border rounded-full p-1 border-black bg-black hover:bg-[#A53E4C] hover:border-white"
                    onClick={() => setIsFilterVisible(false)}
                  >
                    <IoMdClose className="text-white" />
                  </button>
                </div>
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </motion.aside>
            )}
          </AnimatePresence>
          <main
            className={`flex-1 transition-all duration-300 ${
              isFilterVisible ? "lg:w-3/4" : "w-full"
            }`}
          >
            <ProductList
              filters={filters}
              sortOption={sortOption}
              isFilterVisible={isFilterVisible}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
