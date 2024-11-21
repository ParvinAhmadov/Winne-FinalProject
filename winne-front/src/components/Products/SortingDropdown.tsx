"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiCircleChevDown } from "react-icons/ci";

interface SortingDropdownProps {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const SortingDropdown: React.FC<SortingDropdownProps> = ({ sortOption, setSortOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="sorting-dropdown relative">
      <button
        onClick={toggleDropdown}
        className="p-2 border text-[#787878] flex items-center gap-2 bg-white hover:bg-gray-50"
      >
        {sortOption === "default"
          ? "Default sorting"
          : sortOption.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}
        <CiCircleChevDown />
        
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg z-10"
          >
            {[
              { value: "default", label: "Default Sorting" },
              { value: "best-sellers", label: "Best Sellers" },
              { value: "name_asc", label: "Name (A-Z)" },
              { value: "name_desc", label: "Name (Z-A)" },
              { value: "price_asc", label: "Price: Low to High" },
              { value: "price_desc", label: "Price: High to Low" },
            ].map((option) => (
              <li
                key={option.value}
                className={`p-2 cursor-pointer text-[#969696] hover:text-[#A53E4C] ${
                  sortOption === option.value ? "font-medium" : ""
                }`}
                onClick={() => {
                  setSortOption(option.value);
                  setIsOpen(false); 
                }}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortingDropdown;
