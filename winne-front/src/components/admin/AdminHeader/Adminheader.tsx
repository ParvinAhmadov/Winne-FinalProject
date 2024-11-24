"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";

interface AdminheaderProps {
  toggleSidebar?: () => void;
}

const Adminheader: React.FC<AdminheaderProps> = ({ toggleSidebar }) => {
  const [isSpinning, setSpinning] = useState(true);
  const [isFullscreen, setFullscreen] = useState(false);
  const [profileData, setProfileData] = useState<{
    username: string;
    surname: string;
  } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }

        const response = await fetch("http://localhost:3001/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData({
          username: data.user.username,
          surname: data.user.surname,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "/account/login";
      }
    };

    fetchProfile();
  }, []);

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setFullscreen(false));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/account/login";
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="relative">
      <div
        style={{
          backgroundImage:
            "url('https://winne-store-demo.myshopify.com/cdn/shop/files/img-newsletter.png?v=1653967928')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(20px)",
        }}
        className="bg-[#3D3C3E] bg-opacity-100 flex items-center justify-between text-white text-[20px] h-[70px] px-4 top-0 left-0 right-0 z-10"
      >
        <div className="header-left flex flex-row text-xl items-center gap-8">
          <div onClick={toggleSidebar} className="cursor-pointer">
            <LuMenu className="text-[25px]" />
          </div>
        </div>
        <div className="flex items-center gap-6 relative">
          <ul className="flex gap-6 text-2xl items-center">
            <li>
              <div
                className="text-3xl cursor-pointer"
                onClick={handleFullscreenToggle}
              >
                {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
              </div>
            </li>
            <li>
              <div className="relative cursor-pointer">
                <div className="bg-white text-[#45392E] rounded-full absolute flex justify-center items-center top-[-35%] right-[-24%] font-bold text-[10px] w-[15px] h-[15px]">
                  1
                </div>
                <div className="animate-ringing">
                  <IoNotificationsOutline />
                </div>
              </div>
            </li>
            <li className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                <picture className="w-10 h-10">
                  <img
                    className=" w-full h-full rounded-full border-2 border-white object-cover"
                    src="https://www.clipartmax.com/png/full/319-3191274_male-avatar-admin-profile.png"
                    alt="avatar"
                  />
                </picture>
                <div className="flex items-center gap-2 text-sm">
                  <strong>
                    {profileData
                      ? `${profileData.username} ${profileData.surname}`
                      : "Loading..."}
                  </strong>
                  <motion.div
                    animate={{
                      rotate: dropdownOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <IoIosArrowDown />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 bg-white text-black rounded shadow-lg w-48 p-1 z-20"
                  >
                    <ul className="text-sm">
                      <li
                        className="hover:bg-[#BF7A50] flex items-center gap-2 hover:text-white transition ease-in-out duration-300 p-2 rounded cursor-pointer"
                        onClick={handleLogout}
                      >
                        <CgLogOut />
                        LOGOUT
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li>
              <div
                className={`cursor-pointer transition-transform duration-default ease-default ${
                  isSpinning ? "animate-spin" : ""
                }`}
                onClick={() => setSpinning(!isSpinning)}
              >
                <IoSettingsOutline />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Adminheader;
