"use client";

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      setCartItems(data.items);
    } catch (error) {
      setError("Failed to load cart items. Please try again.");
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleUpdateCart = async () => {
    for (const item of cartItems) {
      await updateCartItem(item.productId, item.quantity);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <ClipLoader color="#A53E4C" size={60} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="bg-gray-100 w-full py-4">
        <div className="max-w-[1460px] mx-auto flex items-center text-lg text-gray-600">
          <a href="/" className="hover:text-gray-800">
            Home
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-semibold text-[#A53E4C]">
            Your Shopping Cart
          </span>
        </div>
      </div>

      <div className="cart-container max-w-[1460px] mx-auto mt-10 px-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mb-10">
                <thead>
                  <tr>
                    <th className="border px-4 py-4 text-xs sm:text-sm font-medium text-left">
                      PRODUCT NAME
                    </th>
                    <th className="border px-4 py-4 text-xs sm:text-sm font-medium text-center">
                      PRICE
                    </th>
                    <th className="border px-4 py-4 text-xs sm:text-sm font-medium text-center">
                      QUANTITY
                    </th>
                    <th className="border px-4 py-4 text-xs sm:text-sm font-medium text-center">
                      TOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.productId}
                      className="border-t text-center h-[124px] text-xs sm:text-sm"
                    >
                      <td className="px-4 py-4 flex items-center gap-4 sm:gap-12">
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                          }
                          alt={item.name}
                          className="w-[50px] h-[60px] sm:w-[80px] sm:h-[100px] object-cover"
                        />
                        <span className="text-[#212529] hover:text-[#A53E4C] cursor-pointer">
                          {item.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-[#A8A8A8]">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border-2 border-gray-300 overflow-hidden">
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] text-center text-sm sm:text-lg font-semibold border-r-2 outline-none"
                            />
                            <div className="flex flex-col items-center">
                              <button
                                className="w-[30px] h-[20px] sm:w-[40px] sm:h-[25px] flex items-center justify-center border-b hover:bg-black hover:text-white transition"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <IoCaretUpOutline />
                              </button>
                              <button
                                className="w-[30px] h-[20px] sm:w-[40px] sm:h-[25px] flex items-center justify-center hover:bg-black hover:text-white transition"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.productId,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                              >
                                <IoCaretDownOutline />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-[#A8A8A8]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() =>
                            setCartItems((prev) =>
                              prev.filter(
                                (cartItem) =>
                                  cartItem.productId !== item.productId
                              )
                            )
                          }
                          className="text-black text-[20px] hover:text-[#A53E4C]"
                        >
                          <IoMdClose />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start">
                <button
                  className="bg-black text-white w-full sm:w-[250px] h-[50px] sm:h-[60px] transition-all hover:bg-[#A53E4C]"
                  onClick={handleUpdateCart}
                >
                  UPDATE CART
                </button>
                <a
                  href="/product"
                  className="hover:bg-black flex items-center justify-center tracking-widest cursor-pointer text-white w-full sm:w-[320px] h-[50px] sm:h-[60px] bg-[#A53E4C] transition-all"
                >
                  CONTINUE SHOPPING
                </a>
              </div>
            </div>

            <div className="border border-gray mt-10 py-6 px-4 sm:px-10">
              <h2 className="text-lg tracking-widest ">CART TOTALS</h2>
              <div className="flex flex-col gap-4 mt-8 pt-4 border-t ">
                <h2 className="text-base sm:text-lg flex items-center gap-[30%]">
                  Total{" "}
                  <span className="text-[#212529] font-semibold">
                    $
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </h2>
                <button className="hover:bg-black transition-all flex items-center justify-center text-white w-full sm:w-[320px] h-[50px] sm:h-[60px] bg-[#A53E4C]">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
