"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductDetailsProps {
  product: {
    name: string;
    price: number;
    description: string;
    images: string[];
    stock: number;
    remainingStock: number;
    slug: string;
    relatedProducts: {
      name: string;
      price: number;
      image: string;
      slug: string;
    }[];
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        toast.error("You must be logged in to add items to the cart.");
        throw new Error("User is not authenticated.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            productId: product.slug,
            quantity,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add product to cart.");
        throw new Error(errorData.message || "Failed to add product to cart.");
      }

      const data = await response.json();
      console.log("Product added to cart:", data);

      toast.success("Product successfully added to cart!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error adding to cart:", errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div>
        <ToastContainer />
      </div>

      <div className="w-full md:w-1/2">
        {product.images.length > 0 ? (
          <picture>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
              alt={product.name}
              className="rounded shadow-lg w-full"
            />
          </picture>
        ) : (
          <p>No image available</p>
        )}
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl text-[#A53E4C] font-bold mb-2">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-red-500 font-bold mb-4">
          Hurry! Only {product.remainingStock} left in stock.
        </p>

        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() =>
              setQuantity((prev) => Math.min(prev + 1, product.stock))
            }
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-[#A53E4C] text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
