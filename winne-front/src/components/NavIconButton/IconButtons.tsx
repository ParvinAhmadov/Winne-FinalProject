import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FiSearch, FiHeart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GrShop } from "react-icons/gr";
import Sidebar from "@/featured/Sidebar/Sidebar";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const IconButtons = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      document.body.classList.add("activedesktop");
    } else {
      document.body.classList.remove("activedesktop");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserModal = () => {
    setIsUserModalOpen(!isUserModalOpen);
    setIsResetPassword(false);
  };

  const switchToRegister = () => {
    setIsRegister(true);
    setIsResetPassword(false);
  };

  const switchToLogin = () => {
    setIsRegister(false);
    setIsResetPassword(false);
  };

  const switchToResetPassword = () => {
    setIsResetPassword(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsSearchOpen(false);
      document.body.classList.remove("activedesktop");
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("activedesktop");
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="relative">
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full z-50 bg-white"
          >
            <div className="w-full h-[522px] flex justify-center p-4 border-b shadow-lg">
              <div className="flex flex-col w-full justify-start items-center">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-[40px] text-center font-bold mb-[20px] w-full"
                >
                  Start typing and hit Enter
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-[900px]"
                >
                  <motion.input
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    type="text"
                    placeholder="Search Anything"
                    className="py-[8px] px-[10px] outline-none h-[44px] border-b-2 border-gray-200 w-full pr-10 mt-10"
                  />
                  <FiSearch className="absolute right-3 top-2 text-black text-[20px] mt-10 hover:text-[#982B2B] transition-all ease-in-out duration-200 cursor-pointer" />
                </motion.div>
              </div>
              <div className="absolute right-3 top-3">
                <IoClose
                  className="text-[32px] hover:text-[#982B2B] transition-all ease-in-out duration-200 cursor-pointer"
                  onClick={toggleSearch}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUserModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white w-[500px] h-[600px] -m-[15px]  shadow-lg p-[50px] relative"
            >
              <div className="absolute -top-8 text-white  -right-1 cursor-pointer">
                <IoMdClose
                  className="text-3xl hover:text-[#982B2B] transition-all duration-300 hover:rotate-180"
                  onClick={toggleUserModal}
                />
              </div>

              <div className="text-center w-[400px] mx-autoflex-col items-start ">
                <div className="w-[366px] mx-auto  border-b pb-[20px] text-[16px]">
                  <Image
                    src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
                    alt="Logo"
                    width={160}
                    height={40}
                    className="mx-auto object-cover"
                  />
                </div>

                {isResetPassword ? (
                  <p className="text-[16px]  tracking-[4px] font-semibold mb-[25px] text-[#212529] pt-[25px]">
                    RESET YOUR PASSWORD
                  </p>
                ) : (
                  !isRegister && (
                    <p className="text-xl mb-[14px] text-#111111 pt-[20px]">
                      Great to have you back!
                    </p>
                  )
                )}
              </div>

              <form className="space-y-4 w-[366px] mx-auto ">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full h-[55px] px-[12px] py-[6px] border border-gray-300 placeholder:text-[14px] focus:outline-none focus:placeholder:text-black "
                />
                {!isResetPassword && (
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full h-[55px] px-[12px] py-[6px]  border border-gray-300 placeholder:text-[14px]  focus:outline-none focus:placeholder:text-black  "
                  />
                )}

                {!isRegister && !isResetPassword && (
                  <div
                    onClick={switchToResetPassword}
                    className="text-start inline-block text-[#C5C4C4] hover:text-[#982B2B] transition-all ease duration-200 text-sm cursor-pointer mt-6 "
                  >
                    Forgot your password?
                  </div>
                )}

                <button className="w-full h-[55px] px-[12px] font-semibold hover:bg-[#982B2B] transition-all ease-in-out duration-300  bg-black text-white  tracking-[2px] mt-4">
                  {isRegister
                    ? "REGISTER"
                    : isResetPassword
                    ? "SUBMIT"
                    : "LOG IN"}
                </button>
              </form>

              {!isRegister && !isResetPassword ? (
                <div className="mt-6 text-center ">
                  <p className="bg-[#F2F2F2] text-[#212529] text-sm p-[10px] w-[366px] mx-auto ">
                    Don’t have an account?{" "}
                    <button
                      onClick={switchToRegister}
                      className="text-[#C5C4C4]  hover:text-[#982B2B] transition-all ease duration-200"
                    >
                      Register now
                    </button>
                  </p>
                </div>
              ) : isRegister ? (
                <div className="mt-6 text-center  ">
                  <button
                    onClick={switchToLogin}
                    className="bg-[#F2F2F2]  hover:text-[#982B2B] text-sm p-[10px] w-[366px] mx-auto cursor-pointer "
                  >
                    Back to login
                  </button>
                </div>
              ) : (
                <div className="mt-6 text-center">
                  <button
                    onClick={switchToLogin}
                    className="bg-[#F2F2F2] hover:text-[#982B2B] text-sm p-[10px] w-[366px] mx-auto cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="w-[240px] h-[26px] justify-center flex items-center gap-[14px] z-30">
        <IconButton
          icon={<FiSearch className="text-[24px]" />}
          onClick={toggleSearch}
        />
        <IconButton
          icon={<FaRegUser className="text-[22px]" />}
          onClick={toggleUserModal}
        />
        <Link href="/wishlist">
          <IconButton icon={<FiHeart className="text-[24px]" />} />
        </Link>
        <IconButton
          icon={<GrShop className="text-[24px]" />}
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default IconButtons;
