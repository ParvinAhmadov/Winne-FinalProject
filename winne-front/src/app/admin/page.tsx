"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Statistics {
  totalProducts: number;
  bestSellers: number;
}

const AdminPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalProducts: 0,
    bestSellers: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const productsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/all`
        );
        if (!productsResponse.ok) throw new Error("Failed to fetch products.");
        const productsData = await productsResponse.json();
        const totalProducts = productsData.length;

        const bestSellersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-sellers`
        );
        if (!bestSellersResponse.ok)
          throw new Error("Failed to fetch best sellers.");
        const bestSellersData = await bestSellersResponse.json();
        const bestSellers = bestSellersData.length;

        setStatistics({ totalProducts, bestSellers });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold text-black mb-6">Admin Dashboard</h2>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded shadow-sm">
            <p className="text-gray-500">Total Products</p>
            <p className="text-2xl font-bold">{statistics.totalProducts}</p>
          </div>
          <div className="p-4 border rounded shadow-sm">
            <p className="text-gray-500">Best Sellers</p>
            <p className="text-2xl font-bold">{statistics.bestSellers}</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Quick Access</h3>
        <div className="flex flex-col gap-4">
          <Link
            href="admin/products"
            className="bg-blue-500 text-center  text-white px-4 py-2 rounded"
          >
            Manage Products
          </Link>
          <Link
            href="admin/best-sellers"
            className="bg-green-500 text-center text-white px-4 py-2 rounded"
          >
            Manage Best Sellers
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
