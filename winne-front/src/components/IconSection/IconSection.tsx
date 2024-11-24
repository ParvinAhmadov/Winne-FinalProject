"use client";

import React from "react";

interface SectionItem {
  icon: string;
}

const items: SectionItem[] = [
  {
    icon: "https://winne-store-demo.myshopify.com/cdn/shop/files/brand1.jpg?v=1653894622",
  },
  {
    icon: "https://winne-store-demo.myshopify.com/cdn/shop/files/brand2.jpg?v=1653894633",
  },
  {
    icon: "https://winne-store-demo.myshopify.com/cdn/shop/files/brand3.jpg?v=1653894642",
  },
  {
    icon: "https://winne-store-demo.myshopify.com/cdn/shop/files/brand4.jpg?v=1653894664",
  },
  {
    icon: "https://winne-store-demo.myshopify.com/cdn/shop/files/brand5.jpg?v=1653894675",
  },
];

const IconSection: React.FC = () => {
  return (
    <div className="bg-white mt-8">
      <div className="max-w-[1450px] mx-auto grid grid-cols-2 gap-4 md:grid-cols-5 p-4 md:p-0 md:gap-0">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-full h-[130px] border border-gray-300 cursor-pointer"
          >
            <img
              src={item.icon}
              alt={`Icon ${index}`}
              className="w-[130px] h-[130px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSection;
