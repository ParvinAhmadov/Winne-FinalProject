import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TbLogs, TbShoppingCartStar } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-[250px] h-full transition-all duration-300 ${
        isOpen
          ? "translate-x-0 opacity-100 visible"
          : "-translate-x-full opacity-0 invisible"
      }`}
      style={{
        backgroundImage:
          "url('https://winne-store-demo.myshopify.com/cdn/shop/articles/blog2_1024x1024.png?v=1653885473')",
        backgroundSize: "cover",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="bg-black bg-opacity-60 h-full w-full p-6">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
            alt="Winne Logo"
            width={150}
            height={40}
            className="object-contain"
          />
        </div>

        <ul className="flex flex-col gap-4 text-base">
          <li>
            <Link href="/admin">
              <div className="group p-4 bg-black shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3 ">
                  <RxDashboard className="text-white text-xl  transition-all" />
                  <span className="text-white text-sm tracking-widest font-semibold transition-all ">
                    DASHBOARD
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/admin/products">
              <div className="group p-4 bg-black shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <MdOutlineProductionQuantityLimits className="text-white text-xl  transition-all" />
                  <span className="text-white text-sm tracking-widest font-semibold transition-all">
                    PRODUCTS
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/admin/best-sellers">
              <div className="group p-4 bg-black shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <TbShoppingCartStar className="text-white text-xl  transition-all" />
                  <span className="text-white text-sm tracking-widest font-semibold transition-all">
                    BEST SELLERS
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/admin/orders">
              <div className="group p-4 bg-black shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <GrStatusGood className="text-white text-xl  transition-all" />
                  <span className="text-white text-sm tracking-widest font-semibold transition-all">
                    ORDERS
                  </span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/blogs">
              <div className="group p-4 bg-black shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <TbLogs className="text-white text-xl  transition-all" />
                  <span className="text-white text-sm tracking-widest font-semibold transition-all">
                    Blogs
                  </span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/messages">
              <div className="group p-4 bg-black shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <TbLogs className="text-white text-xl  transition-all" />
                  <span className="text-white text-sm tracking-widest font-semibold transition-all">
                    USER MESSAGES
                  </span>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
