"use client";
import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
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
        className="bg-[#3D3C3E]  bg-opacity-100  flex items-center justify-between text-white text-[20px] h-[70px] px-4  top-0 left-0 right-0 z-10"
      >
        <div className="header-left flex flex-row text-xl items-center gap-8">
          <div onClick={toggleSidebar} className="cursor-pointer">
            <LuMenu className="text-[25px]" />
          </div>
        </div>
        <div className="flex items-center gap-6">
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
            <li>
              <div className="flex items-center gap-2 cursor-pointer">
                <picture>
                  <img
                    className="w-10 rounded-full border-4 border-gray-600"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKVthIfiYthRncPbOBr4bA1SFIdExbup_hg&s"
                    alt="avatar"
                  />
                </picture>
                <p
                  className="flex items-center gap-2 text-sm cursor-pointer"
                  onClick={handleSidebarToggle}
                >
                  Parvin Ahmadov
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
    </header>
  );
};

export default Adminheader;
