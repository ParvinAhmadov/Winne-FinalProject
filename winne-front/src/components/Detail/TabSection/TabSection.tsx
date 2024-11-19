"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DescriptionContent from "../DescriptionContent/DescriptionContent";
import AdditionalInformation from "../AdditionalInformation/AdditionalInformation";

interface Product {
  name?: string;
  images?: string[];
  // Eğer başka özellikler varsa buraya ekleyin
}

interface TabSectionProps {
  product: Product; // `product` artık tam olarak tanımlı bir nesne
}

export default function TabSection({ product }: TabSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return <DescriptionContent key="description" />;
      case "additionalInfo":
        return (
          <AdditionalInformation
            key="additionalInfo"
            product={product} // `product` burada geçiliyor
          />
        );
      case "review":
        return (
          <motion.div
            key="review"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4"
          >
            <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
            <p className="text-gray-600">
              No reviews yet. Be the first to write a review!
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {/* Tab Buttons */}
      <div className="flex flex-col gap-2 mr-6 ml-4 border-b mb-4 justify-center pb-4 border-t pt-4 sm:flex-row sm:gap-4">
        <button
          className={`px-4 py-2 font-semibold transition-all duration-100 ease-in-out relative overflow-hidden ${
            activeTab === "description"
              ? "border-b-2 border-[#A53E4C] text-[#A53E4C]"
              : "text-[#969696] hover:text-[#A53E4C]"
          }`}
          onClick={() => setActiveTab("description")}
        >
          DESCRIPTION
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-all duration-500 ease-in-out relative overflow-hidden ${
            activeTab === "additionalInfo"
              ? "border-b-2 border-[#A53E4C] text-[#A53E4C]"
              : "text-[#969696] hover:text-[#A53E4C]"
          }`}
          onClick={() => setActiveTab("additionalInfo")}
        >
          ADDITIONAL INFORMATION
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-all duration-500 ease-in-out relative overflow-hidden ${
            activeTab === "review"
              ? "border-b-2 border-[#A53E4C] text-[#A53E4C]"
              : "text-[#969696] hover:text-[#A53E4C]"
          }`}
          onClick={() => setActiveTab("review")}
        >
          REVIEW
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
}
