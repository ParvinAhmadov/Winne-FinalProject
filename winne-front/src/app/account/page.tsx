"use client";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

interface User {
  email: string;
  role: string;
}

interface Order {
  id: number;
  product: string;
  date: string;
}

const AccountPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [billingAddress, setBillingAddress] = useState<string>("United States");

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first!");
      window.location.href = "/account/login";
      return;
    }

    try {
      const decoded: User = jwtDecode(token);
      setUser(decoded);

      setOrders([
        { id: 1, product: "Sauvignon Blanc Wine", date: "48 minutes ago" },
        { id: 2, product: "Merlot Wine", date: "2 days ago" },
      ]);
    } catch {
      toast.error("Invalid session. Please log in again.");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.href = "/account/login";
    }
  }, []);

  const handleBillingUpdate = () => {
    const newAddress = prompt(
      "Enter your new billing address:",
      billingAddress
    );
    if (newAddress) {
      setBillingAddress(newAddress);
      toast.success("Billing address updated successfully!");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading account details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-12 bg-white">

      <div className="w-full max-w-lg p-6 ">
        <h2 className="text-lg text-center font-semibold mb-2">{user.email}</h2>
        <p className="text-center flex items-center justify-center gap-1  text-black mb-6">
          (<span className="text-[17px]">not</span>{" "}
          <div className="font-semibold md:text-[17px] text-[15px]">{user.email}</div>?{" "}
          <span
            className=" cursor-pointer text-[15px]"
            onClick={() => {
              localStorage.removeItem("token");
              sessionStorage.removeItem("token");
              window.location.href = "/account/login";
            }}
          >
            Sign out
          </span>
          ).
        </p>

        <div className="border-t pt-4 mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
          {orders.length > 0 ? (
            <ul className="text-gray-700 text-sm">
              {orders.map((order) => (
                <li key={order.id} className="mb-2">
                  {order.product}{" "}
                  <span className="text-gray-500">({order.date})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven’t placed any orders yet.</p>
          )}
        </div>

        <div className="border-t pt-4 mt-4 text-center">
          <div className="flex items-center justify-center text-center gap-2 mb-2">
            <h3 className="text-[16px] font-semibold tracking-widest ">
              BILLING ADDRESS
            </h3>
            <button onClick={handleBillingUpdate} className="text-sm hover:text-[#A53E4C] transition ease duration-200">
              Edit
            </button>
          </div>
          <p className="text-gray-600 mt-8">{billingAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
