"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/featured/Header";
import Footer from "@/featured/Footer";
import AdminFooter from "@/components/admin/AdminFooter/AdminFooter";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import Adminheader from "@/components/admin/AdminHeader/Adminheader";
import UpButton from "@/components/UpButton";
import ErrorPage from "@/app/error/page";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface LayoutProps {
  children: ReactNode;
}

const knownRoutes = ["/", "/admin", "/account"];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [isKnownRoute, setIsKnownRoute] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const routeExists = knownRoutes.some((route) => pathname.startsWith(route));
    setIsKnownRoute(routeExists);
    setLoading(false);
  }, [pathname]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

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
      <Header toggleSidebar={toggleSidebar} />
      <main>{children}</main>
      <UpButton />
      <Footer />
    </div>
  );
};

export default Layout;
