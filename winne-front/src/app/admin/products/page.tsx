"use client";

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollapsibleTable from "../productsTable/productsTable";
import Select, { StylesConfig, MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
interface ColorOption {
  label: string;
  value: string;
  hex: string;
}

interface TagOption {
  label: string;
  value: string;
}

interface SizeOption {
  label: string;
  value: string;
}

interface Product {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  images: string[] | File[];
  slug: string;
  colors: { name: string; hex: string }[];
  tags: string[];
  sizes: string[];
}

const animatedComponents = makeAnimated();

const colourStyles: StylesConfig<ColorOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
      ? (data as ColorOption).hex
      : isFocused
      ? "rgba(0, 0, 0, 0.1)"
      : undefined,
    color: isDisabled
      ? "#ccc"
      : isSelected
      ? "white"
      : (data as ColorOption).hex,
    cursor: isDisabled ? "not-allowed" : "default",
    ":active": {
      ...styles[":active"],
      backgroundColor: !isDisabled
        ? isSelected
          ? (data as ColorOption).hex
          : "rgba(0, 0, 0, 0.3)"
        : undefined,
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.hex,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.hex,
    ":hover": {
      backgroundColor: data.hex,
      color: "white",
    },
  }),
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    remainingStock: 0,
    images: [],
    slug: "",
    colors: [],
    tags: [],
    sizes: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const colorOptions: ColorOption[] = [
    { label: "Red", value: "Red", hex: "#FF0000" },
    { label: "Green", value: "Green", hex: "#00FF00" },
    { label: "Blue", value: "Blue", hex: "#0000FF" },
    { label: "Yellow", value: "Yellow", hex: "#FFFF00" },
    { label: "Black", value: "Black", hex: "#000000" },
    { label: "Gray", value: "Gray", hex: "#808080" },
  ];

  const tagOptions: TagOption[] = [
    { label: "Hot", value: "Hot" },
    { label: "New", value: "New" },
    { label: "Trend", value: "Trend" },
    { label: "Wine", value: "Wine" },
  ];

  const sizeOptions: SizeOption[] = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/all`
        );
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data: Product[] = await response.json();
        setProducts(data);
        toast.success("Products loaded successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products.");
      }
    };
    fetchProducts();
  }, []);

  const resetModal = () => {
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      remainingStock: 0,
      images: [],
      slug: "",
      colors: [],
      tags: [],
      sizes: [],
    });
    setEditIndex(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    selectedOptions: MultiValue<TagOption | SizeOption>,
    field: "tags" | "sizes"
  ) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setNewProduct((prev) => ({
      ...prev,
      [field]: selectedValues,
    }));
  };

  const handleColorChange = (
    selectedOption: MultiValue<ColorOption> | null
  ) => {
    if (selectedOption) {
      const colorValues = selectedOption.map((option) => ({
        name: option.value,
        hex: option.hex,
      }));
      setNewProduct((prev) => ({
        ...prev,
        colors: colorValues,
      }));
    }
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

  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((image) => formData.append("images", image as File));
        } else if (key === "colors" || key === "tags" || key === "sizes") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      formData.append("bestSeller", JSON.stringify(true));

      const url =
        editIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/update/${products[editIndex]._id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/products/create`;

      const method = editIndex !== null ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error("Failed to save product.");

      toast.success(
        `Product ${editIndex !== null ? "updated" : "added"} successfully!`
      );
      setIsModalOpen(false);
      resetModal();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error saving product.");
    }
  };

  const handleEditProduct = (index: number) => {
    setEditIndex(index);
    const productToEdit = products[index];
    setNewProduct({
      ...productToEdit,
      colors: productToEdit.colors,
      tags: productToEdit.tags,
      sizes: productToEdit.sizes,
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (index: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/delete/${products[index]._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete product.");

      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <CollapsibleTable
        products={products}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
      <button
        className="bg-green-700 text-white px-4 py-2 mt-4 hover:bg-green-500 transition ease-in-out duration-200"
        onClick={() => {
          setIsModalOpen(true);
          resetModal();
        }}
      >
        Add Product
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 border-b border-black shadow-xl w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Product" : "Add Product"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={newProduct.slug}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Remaining Stock</label>
                <input
                  type="number"
                  name="remainingStock"
                  value={newProduct.remainingStock}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="col-span-2">
                <label>Colors</label>
                <Select
                  isMulti
                  options={colorOptions}
                  components={animatedComponents}
                  onChange={(selectedOptions) =>
                    handleColorChange(selectedOptions)
                  }
                  styles={colourStyles}
                  className="w-full"
                  value={colorOptions.filter((option) =>
                    newProduct.colors
                      .map((color) => color.name)
                      .includes(option.value)
                  )}
                />
              </div>
              <div className="col-span-2">
                <label>Tags</label>
                <Select
                  isMulti
                  options={tagOptions}
                  components={animatedComponents}
                  onChange={(selectedOptions) =>
                    handleSelectChange(selectedOptions, "tags")
                  }
                  value={tagOptions.filter((option) =>
                    newProduct.tags.includes(option.value)
                  )}
                />
              </div>
              <div className="col-span-2">
                <label>Sizes</label>
                <Select
                  isMulti
                  options={sizeOptions}
                  components={animatedComponents}
                  onChange={(selectedOptions) =>
                    handleSelectChange(selectedOptions, "sizes")
                  }
                  value={sizeOptions.filter((option) =>
                    newProduct.sizes.includes(option.value)
                  )}
                />
              </div>
              <div className="col-span-2">
                <label>Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSaveProduct}
                className="bg-green-700 text-white px-4 py-2 hover:bg-green-500 transition ease-in-out duration-200"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetModal();
                }}
                className="bg-black text-white px-4 py-2 hover:bg-[#A53E4C] transition ease-in-out duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
