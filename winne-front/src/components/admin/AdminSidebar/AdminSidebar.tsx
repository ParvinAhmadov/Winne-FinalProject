import React from "react";
import Link from "next/link";
import Image from "next/image"; 
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
      <div className="bg-black bg-opacity-70 h-full w-full p-6">
        <ul className="flex flex-col gap-5">
          <div className="bg-white p-2 border-none rounded-md">
          <Image
              className="object-cover"
              src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
              alt="Logo"
              width={150}
              height={30} 
            />
          </div>
          <li className="group transition duration-300">
            <Link
              href="/admin"
              className="text-gray-400 group-hover:text-white transition"
            >
              Dashboard
            </Link>
          </li>
          <li className="group transition duration-300">
            <Link
              href="/admin/products"
              className="text-gray-400 group-hover:text-white transition"
            >
              Products
            </Link>
          </li>
          <li className="group transition duration-300">
            <Link
              href="/admin/best-sellers"
              className="text-gray-400 group-hover:text-white transition"
            >
              Best Sellers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
