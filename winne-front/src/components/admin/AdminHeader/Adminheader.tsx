"use client";

import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaWallet } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

interface AdminheaderProps {
  toggleSidebar?: () => void;
}

const Adminheader: React.FC<AdminheaderProps> = ({ toggleSidebar }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSpinning, setSpinning] = useState(true);
  const [isFullscreen, setFullscreen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setFullscreen(false));
    }
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
        className="bg-backColor  bg-opacity-100  flex items-center justify-between text-white text-[20px] h-[70px] px-4  top-0 left-0 right-0 z-10"
      >
        <div className="header-left flex flex-row text-xl items-center gap-8">
          <div onClick={toggleSidebar} className="cursor-pointer">
            <LuMenu />
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <IoSearch />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent placeholder-custom-placeWeight focus:outline-none text-xs placeholder-gray-500 text-white"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-2xl items-center">
            <li>
              <div className="cursor-pointer">
                <MdOutlineDashboardCustomize />
              </div>
            </li>
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
                <div className="bg-red-400 rounded-full absolute flex justify-center items-center top-[-35%] right-[-24%] font-bold text-[10px] w-[15px] h-[15px]">
                  3
                </div>
                <div className="animate-ringing">
                  <IoNotificationsOutline />
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 cursor-pointer">
                <picture>
                  <img
                    className="w-10 rounded-full border-4 border-gray-600"
                    src="https://skote-v-dark.react.themesbrand.com/static/media/avatar-1.3921191a8acf79d3e907.jpg"
                    alt="avatar"
                  />
                </picture>
                <p
                  className="flex items-center gap-2 text-sm cursor-pointer"
                  onClick={handleSidebarToggle}
                >
                  admin
                  <IoIosArrowDown />
                </p>
              </div>
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

      <div
        className={`transition-transform duration-300 ease-in-out fixed top-[70px] right-0 w-40 bg-backColor text-white shadow-md ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 relative z-10">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={handleSidebarToggle}
          >
            X
          </button>
          <ul>
            <li className="mb-2 flex items-center gap-2 cursor-pointer">
              <CgProfile />
              Profile
            </li>
            <li className="mb-2 flex items-center gap-2 cursor-pointer">
              <FaWallet />
              My wallet
            </li>
            <li className="mb-2 flex items-center gap-2 cursor-pointer">
              <IoIosSettings />
              Settings
            </li>
            <li className="mb-2 flex items-center gap-2 cursor-pointer">
              <FaLock />
              Lock screen
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Adminheader;
