"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { Typography, CircularProgress, Box } from "@mui/material";
import { RiShoppingBag4Line } from "react-icons/ri";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
const CheckoutPage: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [billingAddress, setBillingAddress] = useState("Loading...");
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
      window.location.href = "/account/login";
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/account/login";
      return;
    }

    const fetchBillingAddress = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setBillingAddress(data.user.address || "No address set");
      } catch (err) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "/account/login";
      }
    };

    fetchBillingAddress();
  }, []);

  const handleRemoveCartItem = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }

      fetchCartItems();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              amount: 58000,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch client secret."
          );
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);
  useEffect(() => {
    fetchCartItems();
  }, []);
  const options = clientSecret
    ? {
        clientSecret,
        appearance: { theme: "stripe" },
      }
    : undefined;

  return (
    <>
      <nav className="border-b py-4 flex justify-center items-center gap-[20%]">
        <div>
          <h2 className="text-[20px] hover:text-orange-500 cursor-pointer">
            Winne - Wine & Winery Responsive Shopify Theme
          </h2>
        </div>
        <Link href="/product">
          <RiShoppingBag4Line className="text-[20px] text-orange-500 hover:text-orange-600" />
        </Link>
      </nav>
      <div className="max-w-[1200px] mx-auto p-4 bg-[#FAFAFA]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap justify-between mt-8">
            <div className="w-full md:w-7/12 p-4">
              <Box
                sx={{
                  p: 4,
                  backgroundColor: "#fff",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ddd",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  CONTACT
                </Typography>
                <input
                  type="text"
                  placeholder="Email or mobile phone number"
                  className="w-full mb-4 p-3 border border-gray-300 focus:outline-none "
                />
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    paddingBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  DELIVERY
                </Typography>
                <div className="mb-4">
                  <select className="w-full mb-4 p-3 border border-gray-300 focus:outline-none ">
                    <option>Country/Region</option>
                    <option>{billingAddress}</option>
                    <option>Azerbaijan</option>
                    <option>United States</option>
                    <option>United Arab Emirates</option>
                    <option>Belgium</option>
                  </select>
                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-1/2 p-3 border border-gray-300 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-1/2 p-3 border border-gray-300  focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full mb-4 p-3 border border-gray-300 focus:outline-none "
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc."
                    className="w-full mb-4 p-3 border border-gray-300  focus:outline-none"
                  />
                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-2/3 p-3 border border-gray-300 focus:outline-none "
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="w-2/3 p-3 border border-gray-300 focus:outline-none "
                    />
                  </div>
                </div>
                {loading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 6 }}
                  >
                    <CircularProgress size={40} />
                  </Box>
                ) : error ? (
                  <Typography variant="body1" color="error" textAlign="center">
                    {error}
                  </Typography>
                ) : (
                  clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                      <CheckoutForm clientSecret={clientSecret} />
                    </Elements>
                  )
                )}
              </Box>
            </div>
            <div className="w-full md:w-4/12 p-4 ">
              <div className="p-4 border border-gray-300  bg-white shadow-sm">
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    borderBottom: "1px solid gray",
                    paddingBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  ORDER SUMMARY
                </Typography>

                <div className="flex justify-between items-center mt-4">
                  <Typography variant="body1">Shipping</Typography>
                  <div>
                    <p className="MuiTypography-root MuiTypography-body1 css-rizt0-MuiTypography-root">
                      {billingAddress}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <h2 className="text-base sm:text-lg flex items-center justify-between w-full">
                    Total
                    <span className="text-[#212529] font-semibold">
                      <span className="text-[10px] text-[#A8A8A8]">USD</span> $
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </h2>
                </div>
              </div>

              <div className="overflow-x-auto mb-10 mt-8 border-gray-300  bg-white shadow-sm">
                <table className="min-w-[300px] max-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border px-1 sm:px-2 py-2 sm:py-3 text-xs sm:text-sm font-medium text-left">
                        PRODUCT NAME
                      </th>
                      <th className="border px-1 sm:px-2 py-2 sm:py-3 text-xs sm:text-sm font-medium text-center">
                        PRICE
                      </th>
                      <th className="border px-1 sm:px-2 py-2 sm:py-3 text-xs sm:text-sm font-medium text-center">
                        QTY
                      </th>

                      <th className="border px-1 sm:px-2 py-2 sm:py-3 text-xs sm:text-sm font-medium text-center">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.productId}
                        className="border-t text-center md:h-[80px]  text-xs sm:text-sm"
                      >
                        <td className="px-1 sm:px-2 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 border-r">
                          <img
                            src={
                              item.image.startsWith("http")
                                ? item.image
                                : `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                            }
                            alt={item.name}
                            className="md:w-[80px] md:h-[80px] w-[60px] h-[60px] object-cover"
                          />
                          <span className="text-[#212529] hover:text-[#A53E4C] cursor-pointer">
                            {item.name}
                          </span>
                        </td>
                        <td className="px-1 sm:px-2 py-2 sm:py-3 text-center border-r text-[#A8A8A8] font-semibold">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="border-r text-[#A8A8A8] font-semibold">
                          {item.quantity}
                        </td>
                        <td className="px-1 sm:px-2 py-2 sm:py-3 text-center">
                          <button
                            onClick={() => handleRemoveCartItem(item.productId)}
                            className="text-black text-base hover:text-[#A53E4C]"
                          >
                            <IoMdClose />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CheckoutPage;
