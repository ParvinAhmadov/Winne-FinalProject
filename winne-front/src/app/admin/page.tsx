"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { FaArrowUp, FaCube, FaClock, FaShoppingCart } from "react-icons/fa";

interface Statistics {
  totalProducts: number;
  bestSellers: number;
  totalOrders: number;
  pendingOrders: number;
}

interface DecodedToken {
  isAdmin: boolean;
}

const AdminPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalProducts: 0,
    bestSellers: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/account/login");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);

        if (!decoded.isAdmin) {
          router.replace("/");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Invalid token:", error);
        router.replace("/account/login");
      }
    };

    verifyAdmin();
  }, [router]);

  useEffect(() => {
    if (loading) return;

    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found.");

        const [productsResponse, bestSellersResponse, ordersResponse] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/all`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-sellers`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/admin/all`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        if (
          !productsResponse.ok ||
          !bestSellersResponse.ok ||
          !ordersResponse.ok
        ) {
          throw new Error("Failed to fetch statistics.");
        }

        const productsData = await productsResponse.json();
        const bestSellersData = await bestSellersResponse.json();
        const ordersData = await ordersResponse.json();

        if (!Array.isArray(ordersData)) {
          throw new Error("Invalid orders data structure.");
        }

        const totalProducts = Array.isArray(productsData)
          ? productsData.length
          : 0;
        const bestSellers = Array.isArray(bestSellersData)
          ? bestSellersData.length
          : 0;
        const totalOrders = ordersData.length;
        const pendingOrders = ordersData.filter(
          (order: any) => order.status === "Pending"
        ).length;

        setStatistics({
          totalProducts,
          bestSellers,
          totalOrders,
          pendingOrders,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setStatistics({
          totalProducts: 0,
          bestSellers: 0,
          totalOrders: 0,
          pendingOrders: 0,
        });
      }
    };

    fetchStatistics();
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="p-10 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://winne-store-demo.myshopify.com/cdn/shop/files/bn1.1.png?v=1653892975')",
      }}
    >
      <h2 className="text-2xl tracking-widest font-extrabold text-[#212529] mb-8 bg-white bg-opacity-80 p-4 rounded-lg shadow-md">
        ADMIN DASHBOARD
      </h2>

      <section className="mb-12">
        <h3 className="text-xl tracking-widest font-semibold text-[#212529] mb-6 bg-white bg-opacity-80 p-4 rounded-lg shadow-md">
          OVERVIEW
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaCube className="h-10 w-10 text-blue-600" />,
              label: "Total Products",
              value: statistics.totalProducts,
            },
            {
              icon: <FaArrowUp className="h-10 w-10 text-green-600" />,
              label: "Best Sellers",
              value: statistics.bestSellers,
            },
            {
              icon: <FaShoppingCart className="h-10 w-10 text-orange-600" />,
              label: "Total Orders",
              value: statistics.totalOrders,
            },
            {
              icon: <FaClock className="h-10 w-10 text-red-600" />,
              label: "Pending Orders",
              value: statistics.pendingOrders,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-80 border rounded-lg shadow-md flex items-center space-x-4"
            >
              {stat.icon}
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <p className="text-4xl font-bold text-[#212529] mt-2">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-xl tracking-widest font-semibold text-gray-700 mb-6 bg-white bg-opacity-80 p-4 rounded-lg shadow-md">
          QUICK ACCESS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Manage Products", href: "/admin/products" },
            { label: "Manage Best Sellers", href: "/admin/best-sellers" },
            { label: "Manage Orders", href: "/admin/orders" },
            { label: "Manage Blogs", href: "/admin/blogs" },
            { label: "Home Page", href: "/" },
            { label: "Blogs Page", href: "/blogs" },
            { label: "Products Page", href: "/product" },
            { label: "Cart Page", href: "/cart" },
            { label: "Account Page", href: "/account" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="bg-gradient-to-r from-indigo-500 text-center text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
