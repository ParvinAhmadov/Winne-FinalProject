import React from "react";
import Link from "next/link";
import { FaBox, FaShoppingCart, FaStar, FaTachometerAlt } from "react-icons/fa";
import Image from "next/image";
import { TbLogs } from "react-icons/tb";
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
              <div className="group p-4 bg-gray-100 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <FaTachometerAlt className="text-gray-700 text-2xl group-hover:text-indigo-500 transition-all" />
                  <span className="text-gray-800 font-semibold transition-all group-hover:text-indigo-500">
                    Dashboard
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/admin/products">
              <div className="group p-4 bg-gray-100 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <FaBox className="text-gray-700 text-2xl group-hover:text-green-500 transition-all" />
                  <span className="text-gray-800 font-semibold transition-all group-hover:text-green-500">
                    Products
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/admin/best-sellers">
              <div className="group p-4 bg-gray-100 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <FaStar className="text-gray-700 text-2xl group-hover:text-yellow-500 transition-all" />
                  <span className="text-gray-800 font-semibold transition-all group-hover:text-yellow-500">
                    Best Sellers
                  </span>
                </div>
              </div>
            </Link>
          </li>

          <li>
            <Link href="/admin/orders">
              <div className="group p-4 bg-gray-100 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <FaShoppingCart className="text-gray-700 text-2xl group-hover:text-red-500 transition-all" />
                  <span className="text-gray-800 font-semibold transition-all group-hover:text-red-500">
                    Orders
                  </span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/blogs">
              <div className="group p-4 bg-gray-100 rounded-md shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <TbLogs  className="text-gray-700 text-2xl group-hover:text-blue-500 transition-all" />
                  <span className="text-gray-800 font-semibold transition-all group-hover:text-blue-500">
                    Blogs
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
