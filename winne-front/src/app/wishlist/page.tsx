"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

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

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in.");
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
        setError("Failed to load wishlist. Please try again.");
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
      {/* Hero Section */}
      <div className="relative w-full h-[404px]">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348" // Update with your image path
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
              {" "}
              <FaChevronRight className="text-[10px]" />
            </span>
            Wishlist
          </p>
        </div>
      </div>

      <div className="wishlist-container max-w-[1100px] mx-auto mt-10">
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border font-normal w-[402px] tracking-widest border-gray-300 px-4 py-2 text-left">
                    PRODUCT NAME
                  </th>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-center">
                    PRICE
                  </th>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-center">
                    ACTION
                  </th>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item.productId._id} className="text-left">
                    <td className="px-4 py-2 flex items-center gap-10">
                      <Image
                        src={
                          item.productId.images[0]
                            ? `${process.env.NEXT_PUBLIC_API_URL}${item.productId.images[0]}`
                            : "/placeholder-image.jpg"
                        }
                        alt={item.productId.name}
                        width={80}
                        height={100}
                        className="object-cover"
                      />
                      <span className="text-[#A8A8A8]">
                        {item.productId.name}
                      </span>
                    </td>
                    <td className="text-center text-[#A8A8A8] px-4 py-2">
                      ${item.productId.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex w-full items-center justify-center">
                        <button
                          className="bg-black text-white w-[200px] h-[55px] hover:bg-[#A53E4C] transition ease-in-out duration-200"
                          onClick={() =>
                            alert(
                              "Add to Cart functionality for product coming soon!"
                            )
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <button
                          className="text-black text-[20px] hover:text-[#A53E4C] font-bold"
                          onClick={() =>
                            handleRemoveFromWishlist(item.productId._id)
                          }
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            className="bg-black text-white px-4 py-4 hover:bg-[#A53E4C] transition ease-in-out duration-200"
            onClick={() =>
              alert("Continue Shopping functionality coming soon!")
            }
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
