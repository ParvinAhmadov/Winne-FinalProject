"use client";
import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";
import UpButton from "@/components/UpButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <UpButton />
      <Footer />
    </div>
  );
};

export default Layout;
