"use client";
import React from "react";
import { FilterState } from "@/types";
import { FaAngleRight } from "react-icons/fa";

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFilters((prev) => {
      const currentValues = Array.isArray(prev[name as keyof FilterState])
        ? (prev[name as keyof FilterState] as string[])
        : [];

      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter((item: string) => item !== value);

      return { ...prev, [name]: updatedValues };
    });
  };

  const priceRanges = [
    { label: "$10 - $20", value: "10-20" },
    { label: "$20 - $30", value: "20-30" },
    { label: "$30 - $50", value: "30-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
  ];

  return (
    <div>
      <section className="mb-4">
        <h3 className="text-lg font-bold mb-4 border-black border-l-2 pl-4">
          CATEGORIES
        </h3>
        <ul className="flex flex-col items-start gap-2 ">
          <li className="flex items-center gap-1 group hover:text-[#A53E4C]  active:text-[#A53E4C] ">
            <FaAngleRight className="hidden group-hover:flex" />
            <a href="/">HOME</a>
          </li>
          <li className="flex items-center gap-1 group hover:text-[#A53E4C]  active:text-[#A53E4C] ">
            <FaAngleRight className="hidden group-hover:flex" />
            <a href="/product">SHOP</a>
          </li>
          <li className="flex items-center gap-1 hover:text-[#A53E4C]  group active:text-[#A53E4C] ">
            <FaAngleRight className="hidden group-hover:flex " />
            <a href="/">FEATURED</a>
          </li>
          <li className="flex items-center gap-1 group hover:text-[#A53E4C]  active:text-[#A53E4C] ">
            <FaAngleRight className="hidden group-hover:flex" />
            <a href="/">PAGES</a>
          </li>
          <li className="flex items-center gap-1 group hover:text-[#A53E4C]  active:text-[#A53E4C] ">
            <FaAngleRight className="hidden group-hover:flex" />
            <a href="/blogs">BLOGS</a>
          </li>
        </ul>
      </section>
      <section className="mb-4">
        <h3 className="text-lg font-bold mb-4 border-black border-l-2 pl-4">
          PRICE
        </h3>
        {priceRanges.map((range) => (
          <label
            key={range.value}
            className="flex items-center gap-2 mb-2 hover:text-[#A53E4C] cursor-pointer"
          >
            <input
              type="checkbox"
              name="priceRange"
              value={range.value}
              checked={filters.priceRange?.includes(range.value)}
              onChange={handleFilterChange}
            />
            {range.label}
          </label>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-bold mb-4 border-black border-l-2 pl-4">
          SIZE
        </h3>
        <div className="flex gap-4">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <label
              key={size}
              className="flex items-center justify-center border border-black w-10 h-10 hover:bg-[#A53E4C] hover:text-white transition-all ease-in-out duration-300 hover:border-white cursor-pointer"
            >
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="hidden"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-bold mb-4 border-black border-l-2 pl-4">
          COLOR
        </h3>
        <div className="flex gap-4">
          {["Red", "Green", "Blue", "Yellow", "Gray"].map((color) => (
            <label
              key={color}
              className="flex items-center justify-center cursor-pointer "
            >
              <input
                type="checkbox"
                name="color"
                value={color}
                checked={filters.color.includes(color)}
                onChange={handleFilterChange}
                className="hidden"
              />
              <span
                className={`block w-7 h-7 rounded-full border-2 hover:border-black  ${
                  filters.color.includes(color)
                    ? " border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              ></span>
            </label>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="text-lg font-bold mb-4 border-black border-l-2 pl-4">
          TAGS
        </h3>
        {["Hot", "New", "Trend", "Wine"].map((tag) => (
          <label key={tag} className="flex text-[18px] items-center gap-2 mb-2">
            <input
              type="checkbox"
              name="tags"
              value={tag}
              checked={filters.tags.includes(tag)}
              onChange={handleFilterChange}
            />
            {tag}
          </label>
        ))}
      </section>

      <section className="mb-4 border-black border-l-2 pl-4">
        <h3 className="text-lg font-bold mb-4">BRAND</h3>
        <p className="mt-2 hover:text-[#A53E4C] cursor-pointer">
          Winne - Wine & Winery Responsive Shopify Theme
        </p>
      </section>

      <div className="mt-6">
        <picture>
          {" "}
          <img
            src="https://winne-store-demo.myshopify.com/cdn/shop/files/shopify-banner-sidebar.jpg?v=1653894988"
            alt="Ad Placeholder"
            className="w-full"
          />
        </picture>
      </div>
    </div>
  );
};

export default FilterSidebar;
