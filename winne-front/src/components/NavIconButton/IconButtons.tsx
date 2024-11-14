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
import axios from "axios";
import { toast } from "react-toastify";

const IconButtons = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resetEmail, setResetEmail] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/account"; 
    } else {
      setIsUserModalOpen(!isUserModalOpen);
      setIsResetPassword(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, role, message } = response.data;

      toast.success(message || "Logged in successfully!");
      localStorage.setItem("token", token);

      window.location.href = role === "admin" ? "/admin" : "/account";
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Login failed!"
          : "An unexpected error occurred!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/forgot-password",
        { email: resetEmail }
      );
      toast.success(response.data.message || "Password reset email sent!");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Reset password failed!"
          : "An unexpected error occurred!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          email: registerEmail,
          password: registerPassword,
          role: "user",
        }
      );
      toast.success(response.data.message || "Registered successfully!");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Registration failed!"
          : "An unexpected error occurred!"
      );
    } finally {
      setLoading(false);
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

  const handleClickOutside = (e: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
      setIsSearchOpen(false);
      document.body.classList.remove("activedesktop");
    }
  };

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
            onClick={toggleSearch}
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
            className="fixed top-0 pt-2 left-0 w-full z-50 bg-white"
          >
            <div className="w-full  h-[522px] flex flex-col items-center p-4 border-b shadow-lg relative">
              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-[24px] md:text-[40px] text-center font-bold mb-[20px]"
              >
                Start typing and hit Enter
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="relative w-[90%] md:w-[900px]"
              >
                <motion.input
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  type="text"
                  placeholder="Search Anything"
                  className="py-[8px] px-[10px] outline-none h-[44px] border-b-2 border-gray-200 w-full pr-10"
                />
                <FiSearch className="absolute right-3 top-2 text-black text-[20px] hover:text-[#982B2B] transition-all ease-in-out duration-200 cursor-pointer" />
              </motion.div>

              <IoClose
                className="absolute right-3 top-3 text-[32px] hover:text-[#982B2B] transition-all ease-in-out duration-200 cursor-pointer"
                onClick={toggleSearch}
              />
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
            onClick={toggleUserModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white w-[500px] h-[600px] shadow-lg p-[50px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-2 right-2 text-gray-500 cursor-pointer">
                <IoMdClose
                  className="text-3xl hover:text-[#982B2B] transition-all duration-300"
                  onClick={toggleUserModal}
                />
              </div>

              <div className="text-center w-[400px] mx-auto">
                <div className="w-[366px] mx-auto border-b pb-[20px]">
                  <Image
                    src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
                    alt="Logo"
                    width={160}
                    height={40}
                    className="mx-auto object-cover"
                  />
                </div>

                <p className="text-xl mb-[14px] text-[#111111] pt-[20px]">
                  {isResetPassword
                    ? "RESET YOUR PASSWORD"
                    : isRegister
                    ? "CREATE AN ACCOUNT"
                    : "Great to have you back!"}
                </p>
              </div>

              <form
                className="space-y-4 w-[366px] mx-auto"
                onSubmit={
                  isResetPassword
                    ? handleResetPassword
                    : isRegister
                    ? handleRegister
                    : handleLogin
                }
              >
                <input
                  type="email"
                  value={
                    isResetPassword
                      ? resetEmail
                      : isRegister
                      ? registerEmail
                      : email
                  }
                  onChange={(e) =>
                    isResetPassword
                      ? setResetEmail(e.target.value)
                      : isRegister
                      ? setRegisterEmail(e.target.value)
                      : setEmail(e.target.value)
                  }
                  placeholder="Email address"
                  className="w-full h-[55px] px-[12px] py-[6px] border border-gray-300 placeholder:text-[14px] focus:outline-none focus:placeholder:text-black"
                  required
                />
                {!isResetPassword && (
                  <>
                    <input
                      type="password"
                      value={isRegister ? registerPassword : password}
                      onChange={(e) =>
                        isRegister
                          ? setRegisterPassword(e.target.value)
                          : setPassword(e.target.value)
                      }
                      placeholder="Password"
                      className="w-full h-[55px] px-[12px] py-[6px] border border-gray-300 placeholder:text-[14px] focus:outline-none focus:placeholder:text-black"
                      required
                    />
                    {!isRegister && (
                      <div
                        className="text-left text-sm text-[#C5C4C4] hover:text-[#982B2B] cursor-pointer inline-block"
                        onClick={() => setIsResetPassword(true)}
                      >
                        Forgot your password?
                      </div>
                    )}
                  </>
                )}

                <button
                  className="w-full h-[55px] font-semibold bg-black text-white hover:bg-[#982B2B] transition-all tracking-[2px]"
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : isResetPassword
                    ? "RESET PASSWORD"
                    : isRegister
                    ? "REGISTER"
                    : "LOGIN"}
                </button>
              </form>

              <div className="mt-6 text-center">
                {isRegister || isResetPassword ? (
                  <button
                    onClick={() => {
                      setIsRegister(false);
                      setIsResetPassword(false);
                    }}
                    className="bg-[#F2F2F2] hover:text-[#982B2B] text-sm p-[10px] w-[366px] mx-auto cursor-pointer"
                  >
                    Back to Login
                  </button>
                ) : (
                  <p className="text-sm">
                    Don’t have an account?{" "}
                    <span
                      onClick={() => setIsRegister(true)}
                      className="text-[#C5C4C4] hover:text-[#982B2B] transition-all ease duration-200 cursor-pointer"
                    >
                      Register now
                    </span>
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <div className="md:h-[26px]  justify-center flex items-center gap-2 md:gap-[14px] z-30">
        <IconButton
          icon={<FiSearch className="text-[24px]" />}
          onClick={toggleSearch}
        />
        <IconButton
          icon={<FaRegUser className="text-[22px] hidden md:block" />}
          onClick={toggleUserModal}
        />
        <Link href="/wishlist">
          <IconButton
            icon={<FiHeart className="text-[24px] hidden md:block" />}
          />
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
