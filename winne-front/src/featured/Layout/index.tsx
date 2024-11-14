"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import AdminFooter from "@/components/admin/AdminFooter/AdminFooter";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import Adminheader from "@/components/admin/AdminHeader/Adminheader";
import UpButton from "@/components/UpButton";
import ErrorPage from "@/app/error/page";

interface LayoutProps {
  children: ReactNode;
}

const knownRoutes = ["/", "/admin", "/account"];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [isKnownRoute, setIsKnownRoute] = useState(true);

  useEffect(() => {
    const routeExists = knownRoutes.some((route) => pathname.startsWith(route));
    setIsKnownRoute(routeExists || isAdminRoute);
  }, [pathname, isAdminRoute]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!isKnownRoute) {
    return <ErrorPage />;
  }

  if (isAdminRoute) {
    return (
      <div className="flex">
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
