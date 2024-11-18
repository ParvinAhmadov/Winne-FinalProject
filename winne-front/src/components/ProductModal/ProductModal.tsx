import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { IoCaretDownOutline, IoCaretUpOutline } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }) => void;
  onOpenSidebar?: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  } | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenSidebar,
  product,
}) => {
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    if (product && product.images.length > 0) {
      setMainImage(`${baseUrl}${product.images[0]}`);
    }
    setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (product) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: mainImage,
      });
      onClose();
      if (onOpenSidebar) {
        onOpenSidebar();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-[790px] p-4 h-[500px] relative flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-0 -right-8 text-white hover:text-[#A53E4C]"
        >
          <CgClose size={26} />
        </button>

        <div className="w-full md:w-1/2 flex flex-col items-center">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-cover max-h-full mb-4"
              width={500}
              height={400}
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex justify-center items-center mb-4">
              <p>No Image Available</p>
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 px-8 py-2 flex flex-col">
          <div>
            <div className="border-b pb-4">
              <h2 className="text-[22px] font-semibold mb-2">{product.name}</h2>
              <p className="text-[#212529]">${product.price.toFixed(2)} USD</p>
            </div>
            <p className="text-[#212529] text-[16px] text-left mt-4">
              Wine history Wine is an alcoholic beverage fermented from grapes.
              The natural chemical balance allows grapes to ferment without the
              need...
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center border-2  border-gray-300 overflow-hidden">
              <input
                value={quantity}
                onChange={(e) => {
                  const value = Math.max(
                    1,
                    Math.min(Number(e.target.value), product.stock)
                  );
                  setQuantity(value);
                }}
                className="w-[50px] h-[50px] text-center text-[20px] font-semibold border-r-2 outline-none"
              />
              <div className="flex flex-col">
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(prev + 1, product.stock))
                  }
                  className="w-[40px] h-[25px] flex items-center justify-center border-b-2 hover:bg-black hover:text-white transition"
                >
                  <IoCaretUpOutline />
                </button>
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="w-[40px] h-[25px] flex items-center justify-center  hover:bg-black hover:text-white transition"
                >
                  <IoCaretDownOutline />
                </button>
              </div>
            </div>

            <div
              className="w-[201px] h-[54px] flex items-center justify-center bg-[#A53E4C] hover:bg-black transition ease-in-out duration-300 cursor-pointer"
              onClick={handleAddToCart}
            >
              <button className="text-white tracking-tighter uppercase font-semibold">
                Add to Cart
              </button>
            </div>
          </div>

          <p className="text-sm flex items-center justify-center gap-2 mt-6 border-t pt-2 text-[#212529]">
            <FaExclamationCircle className="text-[#A53E4C]" /> Maximum
            available: {product.stock}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
