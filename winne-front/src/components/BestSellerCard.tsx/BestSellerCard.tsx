import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import { TbSearch } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader";
import ProductModal from "../ProductModal/ProductModal";
import AddToCartModal from "../AddToCartModal/AddToCartModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  images: string[];
  stock: number;
  slug: string;
}

interface BestSellerCardProps {
  name: string;
  price: number;
  image: string;
  productSlug: string;
  productId: string;
  isAuthenticated: boolean;
}

const BestSellerCard: React.FC<BestSellerCardProps> = ({
  name,
  price,
  image,
  productSlug,
  productId,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [cartProduct, setCartProduct] = useState<{
    name: string;
    price: number;
    image: string;
    quantity: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState<{ id: string; name: string }[]>([]);

  const handleWishlistToggle = async () => {
    try {
      setWishlistLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to add items to the wishlist.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to wishlist.");
      }

      const data = await response.json();
      console.log(data.message || "Product added to wishlist!"); 
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred.";
      console.error("Error adding to wishlist:", errorMessage);
    } finally {
      setWishlistLoading(false);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("User not logged in.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/wishlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist.");
        }

        const data = await response.json();
        setWishlist(data); 
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const router = useRouter();

  const imageUrl = image
    ? `${process.env.NEXT_PUBLIC_API_URL}${image}`
    : "/placeholder-image.jpg";

  const handleViewDetails = () => {
    if (!productSlug) {
      toast.error("Product slug is missing or invalid.");
      return;
    }

    router.push(`/products/${productSlug}`);
  };

  const handleSearchClick = async () => {
    setLoading(true);

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

      const data = await response.json();
      setProductDetails({
        id: data.slug,
        name: data.name,
        price: data.price,
        images: data.images,
        stock: data.stock,
        slug: data.slug,
      });
      setModalOpen(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error loading product details:", errorMessage);
      toast.error("Error loading product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const userToken = localStorage.getItem("token");

      if (!userToken) {
        toast.error("You must be logged in to add items to the cart.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            productId: productSlug,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product to cart.");
      }

      await response.json();

      setCartProduct({
        name,
        price,
        image: imageUrl,
        quantity: 1,
      });
      setCartModalOpen(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error adding product to cart:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <ClipLoader color="#A53E4C" size={60} />
        </div>
      )}

      <div className="flex flex-col justify-center ml-[4%] md:ml-0 w-[340px] h-[515.7px] overflow-hidden text-center group relative">
        <div className="relative w-full h-[400px] cursor-pointer">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="cursor-pointer"
              onClick={handleViewDetails}
            />
          )}
          <div className="absolute flex left-1/2 transform -translate-x-1/2 gap-4 bottom-8 opacity-0 group-hover:opacity-100 transition duration-500 z-[1] group-hover:-translate-y-[20px]">
            <button
              onClick={handleAddToCart}
              className="relative bg-white text-[21px] p-3 rounded-full flex items-center justify-center transition duration-500 hover:bg-[#A53E4C] hover:text-white"
            >
              <GrShop />
            </button>
            <button
              onClick={handleSearchClick}
              className="relative bg-white text-[21px] p-3 rounded-full flex items-center justify-center transition duration-500 hover:bg-[#A53E4C] hover:text-white"
            >
              <TbSearch />
            </button>
            <button
              onClick={handleWishlistToggle} 
              disabled={wishlistLoading} 
              className={`relative bg-white text-[21px] p-3 rounded-full flex items-center justify-center transition duration-500 ${
                wishlistLoading
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-[#A53E4C] hover:text-white"
              }`}
            >
              <FaRegHeart />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-[#A53E4C] font-bold mt-2">${price.toFixed(2)}</p>
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddToCart={handleAddToCart}
          product={productDetails}
        />

        <AddToCartModal
          isOpen={isCartModalOpen}
          onClose={() => setCartModalOpen(false)}
          product={cartProduct}
        />
      </div>
    </div>
  );
};

export default BestSellerCard;
