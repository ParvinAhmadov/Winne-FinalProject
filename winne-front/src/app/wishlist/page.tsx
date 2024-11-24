"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface WishlistItem {
  _id: string;
  userId: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    slug: string;
  };
  addedAt: string;
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in.");
          window.location.href = "/account/login";
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist.");
        }

        const data: WishlistItem[] = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        window.location.href = "account/login";
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not logged in.");
        window.location.href = "/account/login";
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist.");
      }

      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setError("Failed to remove product from wishlist.");
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
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
            productId: item.productId._id,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading your wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="relative w-full h-[404px]">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Wishlist Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[46px]  mb-2">Wishlist</h1>
          <p className="text-white text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[10px]" />
            </span>
            Wishlist
          </p>
        </div>
      </div>

      <div className="wishlist-container max-w-[1100px] mx-auto mt-10 px-4">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 mb-6 text-xs sm:text-sm md:text-base">
              <thead className="bg-white">
                <tr>
                  <th className="border font-medium tracking-wide border-gray-300 px-2 sm:px-4 py-2 text-left">
                    PRODUCT NAME
                  </th>
                  <th className="border font-medium tracking-wide border-gray-300 px-2 sm:px-4 py-2 text-center">
                    PRICE
                  </th>
                  <th className="border font-medium tracking-wide border-gray-300 px-2 sm:px-4 py-2 text-center">
                    ACTION
                  </th>
                  <th className="border font-medium tracking-wide border-gray-300 px-2 sm:px-4 py-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr
                    key={item.productId._id}
                    className="border-t text-center h-auto sm:h-[100px] md:h-[120px]"
                  >
                    <td className="flex items-center gap-2 sm:gap-4 md:gap-10 px-2 sm:px-4 py-2">
                      <Image
                        src={
                          item.productId.images[0]
                            ? `${process.env.NEXT_PUBLIC_API_URL}${item.productId.images[0]}`
                            : "/placeholder-image.jpg"
                        }
                        alt={item.productId.name}
                        width={50}
                        height={60}
                        className="object-cover  md:w-[80px] md:h-[100px]"
                      />
                      <span className="text-gray-700 hover:text-[#A53E4C] cursor-pointer">
                        {item.productId.name}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-gray-700">
                      ${item.productId.price.toFixed(2)}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <button
                        className="bg-black text-white text-xs sm:text-sm md:text-base w-full sm:w-[150px] md:w-[200px] h-[35px] sm:h-[45px] md:h-[50px] hover:bg-[#A53E4C] transition-all"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <button
                        className="text-black text-lg hover:text-[#A53E4C] font-bold"
                        onClick={() =>
                          handleRemoveFromWishlist(item.productId._id)
                        }
                      >
                        <IoCloseSharp />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-center">
              <a
                href="/product"
                className="hover:bg-black flex tracking-widest items-center justify-center cursor-pointer text-white w-full sm:w-[290px] md:w-[320px] h-[40px] sm:h-[50px] md:h-[60px] bg-[#A53E4C] transition-all"
              >
                CONTINUE SHOPPING
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
