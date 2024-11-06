"use client";

import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import AdminFooter from "@/components/admin/AdminFooter/AdminFooter";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import Adminheader from "@/components/admin/AdminHeader/Adminheader";
import UpButton from "@/components/UpButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (isAdminRoute) {
    return (
      <div className="flex ">
        <AdminSidebar isOpen={isSidebarOpen} />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-[250px]" : ""
          }`}
        >
          <Adminheader toggleSidebar={toggleSidebar} />
          <main className="p-10 min-h-screen">{children}</main>
          <AdminFooter />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main>{children}</main>
      <UpButton />
      <Footer />
    </div>
  );
};

export default Layout;
