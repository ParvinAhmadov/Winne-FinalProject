"use client";

import React from "react";
import { motion } from "framer-motion";

interface AdditionalInformationProps {
  image: string;
}

export default function AdditionalInformation({
  image,
}: AdditionalInformationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-8"
    >
      <div className="sm:block">
        {image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
            alt="Product Image"
            className="w-full object-cover rounded-md shadow-md"
          />
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-[#A53E4C]">
          Things You Need to Know
        </h2>
        <p className="text-gray-700 mb-4">
          We use industry-standard SSL encryption to protect your details.
          Sensitive information like your name, address, and card details are
          securely encoded.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Safe Payments</li>
          <li>Accept Credit Cards</li>
          <li>Multiple Payment Methods</li>
          <li>Price Includes VAT</li>
          <li>Easy to Order</li>
        </ul>
        <h3 className="text-lg font-semibold text-[#A53E4C] mb-2">
          Express Delivery
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Europe & USA within 2-4 days</li>
          <li>Rest of the world within 3-7 days</li>
          <li>Selected locations only</li>
        </ul>
      </div>
    </motion.div>
  );
}
