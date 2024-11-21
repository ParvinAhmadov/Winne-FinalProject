import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  setCartItems: React.Dispatch<
    React.SetStateAction<
      {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
      }[]
    >
  >;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  cartItems,
  setCartItems,
}) => {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const removeItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in.");
        return;
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== itemId)
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      console.log("Item removed successfully");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed right-0 top-0 h-full w-[380px] bg-white shadow-lg z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 h-[45px] border-b">
              <AiOutlineClose
                className="hover:text-[#982B2B] text-[22px] cursor-pointer"
                onClick={onClose}
              />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className="font-bold">{cartItems.length}</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-start justify-between border-b py-4"
                  >
                    <div className="flex items-center">
                      <picture>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[80px] h-[100px] object-cover mr-4"
                        />
                      </picture>
                      <div className="flex flex-col">
                        <p className="text-lg text-black hover:text-[#A53E4C] cursor-pointer">
                          {item.name}
                        </p>
                        <div className="flex flex-col gap-1 mt-1">
                          <p className="text-sm text-black">
                            <span className="text-black">QTY:</span>{" "}
                            {item.quantity}
                          </p>
                          <p className="text-sm ">
                            ${item.price.toFixed(2)} per unit
                          </p>
                          <p className="text-sm font-semibold text-[#A53E4C]">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-black hover:text-[#A53E4C]"
                      onClick={() => removeItem(item.productId)}
                    >
                      <RiDeleteBin6Line size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center text-[22px] mb-6 font-semibold">
                  Your shopping bag is empty
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-[#982B2B]">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  className="block bg-[#212529] text-white tracking-widest hover:bg-[#A53E4C]  text-center py-2 mb-2 transition ease duration-200"
                >
                  VIEW CART
                </Link>
                <Link
                  href="/checkout"
                  className="block bg-black text-white tracking-widest hover:bg-[#A53E4C] transition ease duration-200 text-center py-2"
                >
                  CHECK OUT
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
