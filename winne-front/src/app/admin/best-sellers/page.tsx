"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollapsibleTable from "../productsTable/productsTable";

interface Product {
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  images: string[];
  slug: string;
  bestSeller: boolean;
  _id?: string;
}

interface NewProduct extends Omit<Product, "images"> {
  images: File[] | string[];
}

const BestSellersPage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newBestSeller, setNewBestSeller] = useState<NewProduct>({
    name: "",
    price: 0,
    stock: 0,
    remainingStock: 0,
    images: [],
    slug: "",
    bestSeller: false,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-sellers`
        );
        if (!response.ok) throw new Error("Failed to fetch best-sellers.");
        const data: Product[] = await response.json();
        setBestSellers(data);
        toast.success("Best-sellers loaded successfully!", {
          toastId: "load-success",
        });
      } catch {
        toast.error("Error fetching best-sellers.", {
          toastId: "load-error",
        });
      }
    };
    fetchBestSellers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBestSeller((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewBestSeller((prev) => ({
        ...prev,
        images: Array.from(files) as File[],
      }));
    }
  };

  const handleAddOrUpdateBestSeller = async () => {
    const formData = new FormData();
    Object.entries(newBestSeller).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((image) => formData.append("images", image as File));
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const url =
        editIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/update/${bestSellers[editIndex]._id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/create`;
      const method = editIndex !== null ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok)
        throw new Error(
          `Failed to ${editIndex !== null ? "update" : "add"} best-seller.`
        );

      toast.success(
        `Best-seller ${editIndex !== null ? "updated" : "added"} successfully!`,
        { toastId: "save-success" }
      );

      if (editIndex !== null) {
        setBestSellers((prev) => {
          const updated = [...prev];
          updated[editIndex] = {
            ...newBestSeller,
            images: bestSellers[editIndex].images,
          } as Product;
          return updated;
        });
      } else {
        window.location.reload();
      }
      setEditIndex(null);
    } catch {
      toast.error(
        `Error ${editIndex !== null ? "updating" : "adding"} best-seller.`,
        { toastId: "save-error" }
      );
    }
  };

  const handleDeleteBestSeller = async (index: number) => {
    const { _id } = bestSellers[index];
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/delete/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete best-seller.");

      toast.success("Best-seller deleted successfully!", {
        toastId: "delete-success",
      });
      setBestSellers((prev) => prev.filter((_, i) => i !== index));
    } catch {
      toast.error("Error deleting best-seller.", { toastId: "delete-error" });
    }
  };

  const handleEditBestSeller = (index: number) => {
    setEditIndex(index);
    setNewBestSeller({ ...bestSellers[index], images: [] });
    toast.info("Best-seller ready to be edited!", { toastId: "edit-info" });
  };

  const formattedBestSellers = bestSellers.map((product) => ({
    ...product,
    images: Array.isArray(product.images) ? (product.images as string[]) : [],
  }));

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <CollapsibleTable
        products={formattedBestSellers}
        onDelete={handleDeleteBestSeller}
        onEdit={handleEditBestSeller}
      />
      <div className="mt-6">
        <h3 className="text-lg font-bold">Add / Edit Best Seller</h3>
        <div className="flex flex-col gap-4 mt-4">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={newBestSeller.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newBestSeller.price}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={newBestSeller.stock}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Remaining Stock</label>
          <input
            type="number"
            name="remainingStock"
            value={newBestSeller.remainingStock}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 rounded"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddOrUpdateBestSeller}
              className={`px-4 py-2 rounded text-white ${
                editIndex !== null ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              {editIndex !== null ? "Update" : "Add"} Best Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellersPage;
