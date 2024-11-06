import React, { useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import { TbSearch } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader";
import ProductModal from "../ProductModal/ProductModal";

interface ProductDetails {
  name: string;
  price: number;
  images: string[];
  stock?: number;
  remainingStock?: number;
  slug: string;
  bestSeller?: boolean;
}

interface BestSellerCardProps {
  name: string;
  price: number;
  image: string;
  productSlug: string;
  onLoad: () => void;
}

const BestSellerCard: React.FC<BestSellerCardProps> = ({
  name,
  price,
  image,
  productSlug,
  onLoad,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageUrl = image
    ? `${process.env.NEXT_PUBLIC_API_URL}${image}`
    : "/placeholder-image.jpg";

  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!productSlug) {
        throw new Error("Product slug is missing or invalid.");
      }

      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/products/${encodeURIComponent(productSlug)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch product details.");
      }

      const data: ProductDetails = await response.json();
      setProductDetails(data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error loading product details:", error);
      setError("Error loading product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <ClipLoader color="#A53E4C" size={60} />
        </div>
      )}

      <div className="flex flex-col justify-center ml-[4%] md:ml-0 w-[340px] h-[515.7px] overflow-hidden text-center group relative">
        <div className="relative w-full h-[400px]">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onLoad={onLoad} // Trigger onLoad when the image loads
            />
          )}
          <div className="absolute flex left-1/2 transform -translate-x-1/2 gap-4 bottom-8 opacity-0 group-hover:opacity-100 transition duration-500 z-[1] group-hover:-translate-y-[20px]">
            <button className="relative bg-white text-[21px] p-3 rounded-full flex items-center justify-center transition duration-500 hover:bg-[#A53E4C] hover:text-white">
              <GrShop />
            </button>
            <button
              onClick={handleSearchClick}
              className="relative bg-white text-[21px] p-3 rounded-full flex items-center justify-center transition duration-500 hover:bg-[#A53E4C] hover:text-white"
            >
              <TbSearch />
            </button>
            <button className="relative bg-white text-[21px] p-3 rounded-full flex items-center justify-center transition duration-500 hover:bg-[#A53E4C] hover:text-white">
              <FaRegHeart />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-[#A53E4C] font-bold mt-2">${price.toFixed(2)}</p>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <ProductModal
          isOpen={isModalOpen && !loading}
          onClose={() => setModalOpen(false)}
          product={productDetails}
        />
      </div>
    </div>
  );
};

export default BestSellerCard;
