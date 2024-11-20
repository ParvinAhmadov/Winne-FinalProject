import React, { useState } from "react";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    image: string;
    quantity: number;
  } | null;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen || !product) return null;

  const calculateTotal = () => (product.price * product.quantity).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white flex py-12 shadow-md w-[90%] max-w-[790px] h-[500px] relative">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-7 text-white hover:text-[#A53E4C] text-4xl"
        >
          &times;
        </button>

        <div className="flex w-[395px] h-[100%] flex-col items-center justify-center border-r">
          <h2 className="text-[23px] text-center text-[#FF4949] mb-4">
            ✔ Added to cart successfully!
          </h2>
          <picture>
            <img
              src={product.image}
              alt={product.name}
              className="w-[178px] h-[200px] object-cover mt-4"
            />
          </picture>
          <div className="flex items-center flex-col justify-center mt-6 gap-1">
            <p className="text-xl text-black">{product.name}</p>
            <p className="text-[#A53E4C]">
              <span className="font-semibold text-sm text-black">PRICE: </span>$
              {product.price.toFixed(2)}
            </p>
            <p className="text-[#A53E4C]">
              <span className="font-semibold text-sm text-black">QTY: </span>
              {product.quantity}
            </p>
            <p className="text-[#A53E4C]">
              <span className="font-semibold text-sm text-black">
                CART TOTALS:
              </span>{" "}
              ${calculateTotal()}
            </p>
          </div>
        </div>

        <div className="flex w-[395px] p-4 h-[100%] flex-col items-center">
          <div className="flex flex-col items-center gap-6 w-[270px]">
            <p className="text-[#A53E4C] text-[23px] mb-2">
              <span className="font-semibold text-[10px] text-black">
                CART TOTALS:
              </span>{" "}
              ${calculateTotal()}
            </p>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 w-full border-2 border-[#A53E4C] hover:bg-[#A53E4C] hover:text-white transition ease-in-out duration-200 text-[17px] text-black text-center"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={() => {
                window.location.href = "/cart";
              }}
              className="flex-1 px-4 py-3 w-full bg-[#A53E4C] hover:bg-black hover:text-white transition ease-in-out duration-200 text-[17px] text-white text-center"
            >
              GO TO CART
            </button>
          </div>
          <div className="flex w-[270px] flex-col justify-start items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-3 h-3"
              />
              <label htmlFor="terms" className="text-[#979797]">
                Agree with terms and conditions.
              </label>
            </div>
            <button
              onClick={() => {
                window.location.href = "/checkout";
              }}
              className={`w-full px-4 py-3 mt-4 text-white text-center ${
                isChecked
                  ? "bg-[#A53E4C] hover:bg-black transition ease-in-out duration-200"
                  : "bg-[#D29EA5] cursor-not-allowed"
              }`}
              disabled={!isChecked}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
