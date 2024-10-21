import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose} // Close sidebar on overlay click
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "", duration: 0.4 }}
            className="fixed right-0 top-0 h-full w-[380px] bg-white shadow-lg z-50 flex flex-col"
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center p-4 h-[45px] border-b">
              <IoClose
                className=" hover:text-[#982B2B]  text-[34px] pr-3 transition-all ease-in-out duration-200 cursor-pointer border-r h-[45px]"
                onClick={onClose}
              />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <span className=" hover:text-[#982B2B] pl-4 font-semibold   w-[25px]  transition-all ease-in-out duration-200 border-l  h-[45px]  flex justify-center items-center ">
                0
              </span>
            </div>

            {/* Sidebar content */}
            <div className="p-4 flex-1 flex flex-col items-center justify-center">
              <p className="text-center text-[22px] mb-6 w-[380px] font-semibold">
                Your shopping bag is empty
              </p>
              <Link
                href="/shop"
                className="bg-black flex items-center justify-center text-white w-[195px] h-[58px] px-4 py-2 hover:bg-[#982B2B] hover:text-white transition ease-in-out duration-300"
              >
                Go to the shop
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
