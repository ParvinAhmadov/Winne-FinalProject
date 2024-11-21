"use client";
import React from "react";
import { motion } from "framer-motion";

interface Product {
  name?: string;
  images?: string[];
}

interface AdditionalInformationProps {
  product: Product;
}

export default function AdditionalInformation({
  product,
}: AdditionalInformationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-4 flex flex-col lg:flex-row gap-10 items-start justify-center"
    >
      <div className="lg:w-3/3">
        <h2 className="text-[12px] tracking-widest font-bold text-gray-500 mb-2 uppercase ">
          More Information to You
        </h2>
        <h3 className="text-2xl font-bold mb-2 text-black">
          Things You Need to Know
        </h3>
        <div className="w-1/2 h-[2px] bg-[#A53E4C] mb-4"></div>
        <p className="text-gray-500 mb-4 leading-relaxed">
          We use industry-standard SSL encryption to protect <br /> your
          details. Potentially sensitive information such as <br /> your name,
          address, and card details are encoded so <br /> they can only be read
          on the secure server.
        </p>
        <ul className="list-none text-gray-500 mb-6 space-y-4">
          <li>Safe Payments</li>
          <li>Accept Credit Card</li>
          <li>Different Payment Method</li>
          <li>Price Includes VAT</li>
          <li>Easy to Order</li>
        </ul>
      </div>

      <div className="lg:w-3/3 lg:mt-20">
        <h3 className="text-lg font-bold text-black mb-2">Express Delivery</h3>
        <ul className="list-none text-gray-500 mb-6 space-y-4">
          <li>Europe & USA within 2-4 days</li>
          <li>Rest of the world within 3-7 days</li>
          <li>Selected locations</li>
        </ul>

        <h3 className="text-lg font-bold text-black mb-2">
          Need More Information
        </h3>
        <ul className="list-none text-gray-500 space-y-2">
          <li>Orders & Shipping</li>
          <li>Returns & Refunds</li>
          <li>Payments</li>
          <li>Your Orders</li>
        </ul>
      </div>

      <div className="flex justify-end items-start lg:w-1/3">
        {product.images && product.images[0] ? (
          <picture>
            {" "}
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
              alt={product.name || "Product Image"}
              className="w-[360px] h-[450px] object-cover shadow-md "
            />
          </picture>
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>
    </motion.div>
  );
}
