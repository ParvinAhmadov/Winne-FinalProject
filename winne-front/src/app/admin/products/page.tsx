"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollapsibleTable from "../productsTable/productsTable";

// Interface for products used in the table (images are strings)
interface Product {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  images: string[];
  slug: string;
  bestSeller: boolean;
}

// Interface for new or editable products (images can be File[] or string[])
interface NewProduct extends Omit<Product, "images"> {
  images: File[] | string[];
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    price: 0,
    stock: 0,
    remainingStock: 0,
    images: [],
    slug: "",
    bestSeller: false,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addAsBestSeller, setAddAsBestSeller] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/all`);
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data: Product[] = await response.json();
        setProducts(data);
        toast.success("Products loaded successfully!", { toastId: "products-load-success" });
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products.", { toastId: "products-load-error" });
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewProduct((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleBestSellerOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddAsBestSeller(e.target.checked);
  };

  const createFormData = (): FormData => {
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((image) => formData.append("images", image as File));
      } else {
        formData.append(key, value as string);
      }
    });
    return formData;
  };

  const handleAddProduct = async () => {
    try {
      const formData = createFormData();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/create`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to add product.");

      toast.success("Product added successfully!", { toastId: "product-add-success" });

      if (addAsBestSeller) {
        await addProductToBestSellers(formData);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product.", { toastId: "product-add-error" });
    }
  };

  const addProductToBestSellers = async (formData: FormData) => {
    try {
      // Make sure the URL path matches your backend API
      const bestSellerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/create`, // Updated URL
        {
          method: "POST",
          body: formData,
        }
      );
      if (!bestSellerResponse.ok) throw new Error("Failed to add to Best Sellers.");
      toast.success("Added to Best Sellers!", { toastId: "best-seller-add-success" });
    } catch (error) {
      console.error("Error adding to Best Sellers:", error);
      toast.error("Error adding to Best Sellers.", { toastId: "best-seller-add-error" });
    }
  };

  const handleDeleteProduct = async (index: number) => {
    const productToDelete = products[index];
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/delete/${productToDelete._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product.");

      toast.success("Product deleted successfully!", { toastId: "product-delete-success" });
      setProducts((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product.", { toastId: "product-delete-error" });
    }
  };

  const handleEditProduct = (index: number) => {
    setEditIndex(index);
    setNewProduct({ ...products[index], images: [] });
    setAddAsBestSeller(products[index].bestSeller);
    toast.info("Product ready to be edited!", { toastId: "product-edit-info" });
  };

  const handleUpdateProduct = async () => {
    if (editIndex === null) return;
    const productToUpdate = products[editIndex];

    try {
      const formData = createFormData();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/update/${productToUpdate._id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update product.");

      toast.success("Product updated successfully!", { toastId: "product-update-success" });

      if (addAsBestSeller) {
        await updateBestSellerStatus(productToUpdate._id, formData);
      }

      setProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts[editIndex] = { ...newProduct, images: productToUpdate.images };
        return updatedProducts;
      });
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product.", { toastId: "product-update-error" });
    }
  };

  const updateBestSellerStatus = async (id: string | undefined, formData: FormData) => {
    if (!id) return;
    try {
      const bestSellerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/update/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!bestSellerResponse.ok) throw new Error("Failed to update Best Seller.");
      toast.success("Best Seller updated successfully!", { toastId: "best-seller-update-success" });
    } catch (error) {
      console.error("Error updating Best Seller:", error);
      toast.error("Error updating Best Seller.", { toastId: "best-seller-update-error" });
    }
  };

  const formattedProducts = products.map((product) => ({
    ...product,
    images: Array.isArray(product.images) ? (product.images as string[]) : [],
  }));

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <CollapsibleTable products={formattedProducts} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
      <div className="mt-6">
        <h3 className="text-lg font-bold">Add / Edit Product</h3>
        <div className="flex flex-col gap-4 mt-4">
          <label className="font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Slug</label>
          <input
            type="text"
            name="slug"
            value={newProduct.slug}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Remaining Stock</label>
          <input
            type="number"
            name="remainingStock"
            value={newProduct.remainingStock}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <label className="font-semibold text-gray-700">Images</label>
          <input type="file" multiple onChange={handleImageChange} className="border p-2 rounded" />
          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={addAsBestSeller}
              onChange={handleBestSellerOptionChange}
              className="h-4 w-4"
            />
            <label className="font-semibold text-gray-700">Add to Best Sellers</label>
          </div>
          <div className="flex gap-4 mt-4">
            {editIndex !== null ? (
              <button onClick={handleUpdateProduct} className="bg-blue-500 text-white px-4 py-2 rounded">
                Update Product
              </button>
            ) : (
              <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded">
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
