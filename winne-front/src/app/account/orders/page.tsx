"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";

interface OrderItem {
  _id: string;
  productId: string | null;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  status: string;
  amount: number;
  items: OrderItem[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not logged in.");
        window.location.href = "/account/login";
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading your orders...</p>
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
      <div className="relative w-full h-[404px]">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Orders Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[46px]  mb-2">My Orders</h1>
          <p className="text-white text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[10px]" />
            </span>
            Orders
          </p>
        </div>
      </div>

      <div className="orders-container max-w-[1100px] mx-auto mt-10">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-left">
                    ORDER ID
                  </th>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-center">
                    STATUS
                  </th>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-center">
                    AMOUNT
                  </th>
                  <th className="border font-normal tracking-widest border-gray-300 px-4 py-2 text-center">
                    ITEMS
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="text-left">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="text-center text-[#A8A8A8] px-4 py-2">
                      {order.status}
                    </td>
                    <td className="text-center text-[#A8A8A8] px-4 py-2">
                    {order.amount ? `$${order.amount.toFixed(2)}` : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {order.items.map((item) => (
                        <div key={item._id} className="mb-2">
                         <strong>{item.name}</strong> x {item.quantity}($
                          {item.price})
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
