"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdArrowRight, MdChevronRight } from "react-icons/md";
import { LuHeart } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

interface ProductDetailsProps {
  product: {
    name: string;
    price?: number;
    oldPrice?: number;
    images?: string[];
    stock?: number;
    remainingStock?: number;
    slug: string;
    soldCount?: number;
    soldDurationHours?: number;
    _id: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [dynamicSoldCount, setDynamicSoldCount] = useState<number>(
    product.soldCount || 0
  );
  const [dynamicSoldDuration, setDynamicSoldDuration] = useState<number>(
    product.soldDurationHours || 0
  );
  const [visitorCount, setVisitorCount] = useState<number>(10);

  const handleWishlistToggle = async () => {
    try {
      console.log("Product:", product);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to add items to the wishlist.");
      }

      const productId = product._id;

      if (!productId) {
        throw new Error("Product ID is missing or invalid.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to wishlist.");
      }

      const data = await response.json();
      console.log(data.message || "Product successfully added to wishlist!");
    } catch (error: any) {}
  };

  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setVisitorCount((prev) => {
        const change = Math.floor(Math.random() * 3);
        const increase = Math.random() > 0.5;
        const newVisitorCount = increase
          ? prev + change
          : Math.max(1, prev - change);
        return newVisitorCount;
      });
    }, 15000);

    return () => clearInterval(visitorInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicSoldCount((prev) => prev + Math.floor(Math.random() * 1));
      setDynamicSoldDuration((prev) => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = async () => {
    try {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        toast.error("You must be logged in to add items to the cart.");
        return;
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
        return;
      }

      toast.success("Product successfully added to cart!");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const openModal = (content: string) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <ToastContainer />

      <nav className="text-[#212529] mb-4 md:mb-6 flex items-center gap-1 text-sm md:text-base">
        <Link href="/" className="hover:text-[#A53E4C]">
          Home
        </Link>{" "}
        <MdChevronRight />{" "}
        <span className="text-[#A53E4C] font-semibold">
          {product.name || "Product"}
        </span>
      </nav>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-1/2">
          {product.images && product.images.length > 0 ? (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
              alt={product.name || "Product Image"}
              className="w-full object-cover"
            />
          ) : (
            <p className="text-gray-500">No image available</p>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col px-4 md:px-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-[20px] md:text-[24px] font-bold">
              {product.name || "Unnamed Product"}
            </h1>
            <div className="group relative flex items-center">
              <button
                onClick={handleWishlistToggle}
                className="border rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-[#A53E4C] cursor-pointer hover:text-white transition"
              >
                <LuHeart className="w-5 h-5" />
              </button>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-2 w-[110px] text-center left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white text-xs rounded px-2 py-1">
                Add to Wishlist
                <div className="w-2 h-2 absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 rotate-45 bg-black"></div>
              </div>
            </div>
          </div>

          <p className="text-[18px] text-[#A53E4C] font-bold mb-4 md:mb-8">
            {product.price
              ? `$${product.price.toFixed(2)} USD`
              : "Price not available"}
          </p>
          <p className="text-gray-500 mb-6 md:mb-10 border-t pt-4">
            Wine history Wine is an alcoholic beverage fermented from grapes.
            The natural chemical balance allows grapes to ferment without the
            need for added sugars, acids, enzymes, water or other nutrients.
            Yeast consumes the sugars in the grapes and converts them into
            alcohol and carbon dioxide. Different grape varieties and
            different...
          </p>

          <div className="py-4 md:py-8 px-2 border mb-4 md:mb-6 relative">
            <h3 className="text-[#28AF5B] font-bold text-lg mb-2 absolute -top-4 left-4 bg-white px-2">
              Special Offer
            </h3>
            <ul className="list-none ml-0 text-[#28AF5B] space-y-1">
              <li className="flex items-center text-[15px] md:text-[17px]">
                <MdArrowRight className="inline-block mr-2" /> In Stock
              </li>
              <li className="flex items-center text-[15px] md:text-[17px]">
                <MdArrowRight className="inline-block mr-2" /> Free Delivery
                Available*
              </li>
              <li className="flex items-center text-[15px] md:text-[17px]">
                <MdArrowRight className="inline-block mr-2" /> Sale 30% Off Use
                Code: <strong>Deal30</strong>
              </li>
            </ul>
          </div>

          <div className="mb-4 md:mb-6">
            <p className="text-lg text-[#A53E4C] font-semibold mb-2">
              {dynamicSoldCount}{" "}
              <span className="text-black">sold in last</span>{" "}
              {dynamicSoldDuration} <span className="text-black">Hour</span>
            </p>
            {product.remainingStock && product.remainingStock > 0 ? (
              <div>
                <p className="text-base md:text-lg text-[#FF5555] font-bold flex items-center mb-2">
                  <img
                    src="https://winne-store-demo.myshopify.com/cdn/shop/t/2/assets/fire.svg"
                    className="w-4 h-4 object-cover mr-2"
                    alt=""
                  />
                  HURRY! ONLY {product.remainingStock} LEFT IN STOCK
                </p>
                <div className="w-full h-2 bg-red-200 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-700 striped-bg"
                    style={{
                      width: `${Math.min(
                        100,
                        (product.remainingStock / product.stock) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            ) : (
              <p className="text-lg text-red-600 font-bold">Out of Stock!</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8 mb-4 md:mb-8">
            <button
              onClick={() => openModal("delivery")}
              className="text-black font-semibold hover:text-[#A53E4C]"
            >
              Delivery & Return
            </button>
            <button
              onClick={() => openModal("question")}
              className="text-black font-semibold hover:text-[#A53E4C]"
            >
              Ask a Question
            </button>
          </div>

          {product.remainingStock && product.remainingStock > 0 && (
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4">
              <div className="flex items-center border-2 ">
                <button
                  className="px-3 py-3 border-r-2 hover:text-[#A53E4C]"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  <IoCaretDownSharp />
                </button>
                <span className="px-2 py-2 w-14 text-center">{quantity}</span>
                <button
                  className="px-3 py-3 border-l-2 hover:text-[#A53E4C]"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(prev + 1, product.remainingStock || 1)
                    )
                  }
                >
                  <IoCaretUpSharp />
                </button>
              </div>{" "}
              <button
                onClick={handleAddToCart}
                className="bg-[#A53E4C] tracking-widest text-white py-3 px-6 w-full md:w-full hover:bg-black hover:text-white transition ease-in-out duration-300"
                disabled={
                  !product.remainingStock || product.remainingStock === 0
                }
              >
                ADD TO CART
              </button>
            </div>
          )}

          <div className="w-full border-b flex pb-4">
            <Link
              href="/checkout"
              className="bg-black tracking-widest text-white py-3 px-6 w-full md:w-[306px] text-center hover:bg-[#A53E4C] hover:text-white transition ease-in-out duration-300"
            >
              BUY IT NOW
            </Link>
          </div>

          <div className="mt-6 text-lg text-[#A53E4C] font-semibold">
            Real time <span className="text-black">{visitorCount}</span> Visitor
            right now
          </div>
          <div className="mt-4 text-[#212529] text-sm">
            Categories :
            <Link href="/" className="text-gray-400 hover:text-[#A53E4C] ml-1">
              Home page,
            </Link>
            <Link
              href="/products"
              className="text-gray-400 hover:text-[#A53E4C] ml-1"
            >
              products/all
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-4 md:p-6 w-11/12 max-w-lg relative"
            >
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={closeModal}
              >
                &times;
              </button>

              {modalContent === "delivery" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Delivery & Return</h2>
                  <p className="text-gray-500">
                    All orders shipped with UPS Express. Always free shipping
                    for orders over US $250. All orders are shipped with a UPS
                    tracking number. Items returned within 14 days of their
                    original shipment date in the same as new condition will be
                    eligible for a full refund or store credit. Refunds will be
                    charged back to the original form of payment used for
                    purchase.
                  </p>
                  <p className="mt-4 font-bold">Help:</p>
                  <p className="text-gray-500">
                    If you have any questions, contact us at:{" "}
                    <a
                      href="mailto:help@example.com"
                      className="text-black underline"
                    >
                      help@example.com
                    </a>{" "}
                    or call +1 (23) 456 789.
                  </p>
                </div>
              )}
              {modalContent === "question" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
                  <form>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border mb-4 p-2 rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border mb-4 p-2 rounded"
                    />
                    <textarea
                      placeholder="Your Question"
                      className="w-full border mb-4 p-2 rounded"
                    />
                    <button className="bg-[#A53E4C] text-white py-2 px-4 rounded">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
