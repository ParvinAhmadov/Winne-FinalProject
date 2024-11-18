"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CollapsibleTable from "../productsTable/productsTable";
import Select, { StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";

interface Product {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  remainingStock: number;
  images: string[] | File[];
  slug: string;
  bestSeller: boolean;
  colors: { name: string; hex: string }[];
  tags: string[];
  sizes: string[];
}

const animatedComponents = makeAnimated();

const colourStyles: StylesConfig<any, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.hex
        : isFocused
        ? "rgba(0, 0, 0, 0.1)"
        : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "white" : data.hex,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.hex
            : "rgba(0, 0, 0, 0.3)"
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => ({
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

const BestSellersPage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newBestSeller, setNewBestSeller] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    remainingStock: 0,
    images: [],
    slug: "",
    bestSeller: true,
    colors: [],
    tags: [],
    sizes: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const colorOptions = [
    { label: "Red", value: "Red", hex: "#FF0000" },
    { label: "Green", value: "Green", hex: "#00FF00" },
    { label: "Blue", value: "Blue", hex: "#0000FF" },
    { label: "Yellow", value: "Yellow", hex: "#FFFF00" },
    { label: "Black", value: "Black", hex: "#000000" },
    { label: "Gray", value: "Gray", hex: "#808080" },
  ];

  const tagOptions = [
    { label: "Hot", value: "Hot" },
    { label: "New", value: "New" },
    { label: "Trend", value: "Trend" },
    { label: "Wine", value: "Wine" },
  ];

  const sizeOptions = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
  ];

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-sellers`
        );
        if (!response.ok) throw new Error("Failed to fetch best sellers.");
        const data: Product[] = await response.json();
        setBestSellers(data);
        toast.success("Best sellers loaded successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error fetching best sellers.");
      }
    };
    fetchBestSellers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBestSeller((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    selectedOptions: any,
    field: "tags" | "sizes"
  ) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setNewBestSeller((prev) => ({
      ...prev,
      [field]: selectedValues,
    }));
  };

  const handleColorChange = (selectedOptions: any) => {
    const colors = selectedOptions.map((option: any) => ({
      name: option.value,
      hex: option.hex,
    }));
    setNewBestSeller((prev) => ({
      ...prev,
      colors,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewBestSeller((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleSaveBestSeller = async () => {
    try {
      const formData = new FormData();
      Object.entries(newBestSeller).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file as File));
        } else if (key === "colors" || key === "tags" || key === "sizes") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      const url =
        editIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/update/${bestSellers[editIndex]._id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/create`;
      const method = editIndex !== null ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) throw new Error("Failed to save best seller.");

      toast.success(
        `Best seller ${editIndex !== null ? "updated" : "added"} successfully!`
      );
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error saving best seller.");
    }
  };

  const handleDeleteBestSeller = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/best-seller/delete/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete best seller.");

      toast.success("Best seller deleted successfully!");
      setBestSellers((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting best seller.");
    }
  };

  const handleEditBestSeller = (index: number) => {
    setEditIndex(index);
    setNewBestSeller(bestSellers[index]);
    setIsModalOpen(true);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <CollapsibleTable
        products={bestSellers}
        onDelete={(index) => handleDeleteBestSeller(bestSellers[index]._id!)}
        onEdit={(index) => handleEditBestSeller(index)}
      />
      <button
        className="bg-green-700 text-white px-4 py-2 mt-4 hover:bg-green-500 transition ease-in-out duration-200"
        onClick={() => {
          setIsModalOpen(true);
          setEditIndex(null);
        }}
      >
        Add New Best Seller
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6  shadow-xl w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Best Seller" : "Add Best Seller"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={newBestSeller.name}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={newBestSeller.price}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newBestSeller.stock}
                  onChange={handleInputChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Remaining Stock</label>
                <input
                  type="number"
                  name="remainingStock"
                  value={newBestSeller.remainingStock}
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
                  onChange={handleColorChange}
                  value={newBestSeller.colors.map((color) =>
                    colorOptions.find((option) => option.value === color.name)
                  )}
                  styles={colourStyles}
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
                  value={newBestSeller.tags.map((tag) =>
                    tagOptions.find((option) => option.value === tag)
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
                  value={newBestSeller.sizes.map((size) =>
                    sizeOptions.find((option) => option.value === size)
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
                onClick={handleSaveBestSeller}
                className="bg-green-700 text-white px-4 py-2  hover:bg-green-500 transition ease-in-out duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-black text-white px-4 py-2  hover:bg-[#A53E4C] transition ease-in-out duration-200"
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

export default BestSellersPage;
