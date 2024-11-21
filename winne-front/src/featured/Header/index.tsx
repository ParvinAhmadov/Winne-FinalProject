import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavItem from "@/components/NavItem/NavItem";
import DropdownContent from "@/components/DropdownContent/DropdownContent";
import IconButtons from "@/components/NavIconButton/IconButtons";
import Tooltip from "@/components/Tooltip/Tooltip";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.css";
import ProductSwiper from "@/components/NavProductItem/ProductSwiper";
import { FiMenu } from "react-icons/fi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { LuUser2 } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
type MenuType = "main" | "Home" | "Shop" | "Featured" | "Pages" | "Blogs";
const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<MenuType>("main");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveMenu("main");
  };

  const handleSubMenu = (menu: MenuType): void => {
    setActiveMenu(menu);
  };
  const menuVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: "-100%", transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setIsFixed(window.scrollY > headerRef.current.clientHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[92px] pt-[25px] pb-[25px] transition-all duration-300 ${
        isFixed ? "fixed top-0 left-0 bg-white shadow-md z-50" : ""
      }`}
      ref={headerRef}
    >
      <div>
        <div className="max-w-[1450px] w-full mx-auto flex justify-between items-center">
          <div className="md:hidden flex items-center">
            <FiMenu
              className="text-[30px] cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <div className="  flex items-center md:order-first">
            <Link href="/">
              <Image
                src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
                className=" w-[140px] h-[30px] ml-[18%] md:ml-0 object-cover"
                alt="Logo"
                width={140}
                height={30}
                layout="fixed"
              />
            </Link>
          </div>

          <nav className="hidden md:flex relative w-[960px] h-[42px] z-10  justify-center font-semibold text-[#212529]">
            <ul className="flex flex-wrap  items-center gap-14 text-[#212529] font-semibold">
              <NavItem
                label="home"
                href="/"
                dropdownContent={
                  <DropdownContent customStyles="-ml-[200px] py-12 px-8 ">
                    <div className="flex   w-[920px] h-[508px]  items-center flex-wrap gap-9 cursor-default ">
                      {["Home 1", "Home 2", "Home 3", "Home 4", "Home 5"].map(
                        (homeItem, index) => (
                          <div
                            key={index}
                            className="w-[276px] h-[189px] flex flex-col gap-2"
                          >
                            <Image
                              className="w-full h-full object-cover hover:shadow-lg transition-all duration-300 cursor-pointer"
                              src={`https://winne-store-demo.myshopify.com/cdn/shop/files/home${
                                index + 1
                              }.png?v=1654053368`}
                              alt={homeItem}
                              layout="responsive"
                              width={276}
                              height={189}
                            />
                            <div className="inline-block">
                              <h2 className="cursor-pointer hover:text-[#982B2B] border-b border-[#982B2B] inline-block">
                                <a href={`/home-${index + 1}`}>{homeItem}</a>
                              </h2>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </DropdownContent>
                }
              />

              <NavItem
                label="shop"
                href="/shop"
                isHot
                dropdownContent={
                  <DropdownContent customStyles="-ml-[370px] py-12 px-8 shadow-sm">
                    <div className="flex w-[1100px]  h-[523px] justify-between ">
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          SHOP LAYOUTS
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-2 font-normal text-gray-500">
                          {[
                            { text: "Fullwidth", href: "#" },
                            { text: "Sidebar Layouts", href: "#" },
                            { text: "Infinity Scroll", href: "#" },
                            { text: "Background Modern", href: "#" },
                            { text: "List View", href: "#" },
                            { text: "Banner Modern", href: "#" },
                          ].map(({ text, href }, index) => (
                            <li key={index}>
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          SHOP HEADING
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-2 font-normal text-gray-500">
                          {[
                            { text: "Heading Style 1", href: "#" },
                            { text: "Heading Style 2", href: "#" },
                            { text: "Heading Style 3", href: "#" },
                            { text: "Heading Style 4", href: "#" },
                            { text: "Heading Style 5", href: "#" },
                          ].map(({ text, href }, index) => (
                            <li key={index}>
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          FILTER LAYOUT
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-2 font-normal text-gray-500">
                          {[
                            {
                              text: "Drawer Filter",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                            { text: "Off Canvas", href: "#" },
                            { text: "Filter Dropdown", href: "#" },
                            {
                              text: "Filter Accordion",
                              href: "#",
                            },
                            {
                              text: "Filter Sticky",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          PRODUCT LAYOUTS
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-2 font-normal text-gray-500">
                          {[
                            {
                              text: "Product Extended",
                              href: "#",
                            },
                            {
                              text: "Product Large Image",
                              href: "#",
                            },
                            { text: "Product Sticky", href: "#" },
                            {
                              text: "Sticky Center",
                              href: "#",
                            },
                            {
                              text: "Product Slider Gallery",
                              href: "#",
                            },
                            {
                              text: "Product Slider Center",
                              href: "#",
                            },
                            {
                              text: "Product Large Grid",
                              href: "#",
                            },
                            {
                              text: "Product Small Grid",
                              href: "#",
                            },
                            {
                              text: "Product Background",
                              href: "#",
                            },
                            { text: "Product Sidebar", href: "#" },
                            { text: "Product Sidebar 2", href: "#" },
                          ].map(({ text, href }, index) => (
                            <li key={index}>
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          PRODUCT TYPES
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-2 font-normal text-gray-500">
                          {[
                            {
                              text: "Simple",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                            {
                              text: "Variable Color",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                            { text: "Variable Image", href: "#" },
                            {
                              text: "Variable Select",
                              href: "#",
                            },
                            {
                              text: "External / Affiliate",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                            {
                              text: "Boosted Sale",
                              href: "#",
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          PRODUCT EXTENDS
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-2 font-normal text-gray-500">
                          {[
                            { text: "Promo Text", href: "#" },
                            { text: "Trust Sale", href: "#" },
                            { text: "Countdown", href: "#" },
                            { text: "Featured Video", href: "#" },
                          ].map(({ text, href }, index) => (
                            <li key={index}>
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DropdownContent>
                }
              />

              <NavItem
                label="featured"
                href="/featured"
                dropdownContent={
                  <DropdownContent customStyles="-ml-[100px] py-12 px-8  w-[700px] h-[609px] flex flex-col justify-between shadow-sm">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          ANIMATE DEMOS
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "Quickview-Popup",
                              href: "#",
                              tooltip: { text: "TREND", color: "bg-blue-700" },
                            },
                            { text: "Minicart Draws", href: "#" },
                            {
                              text: "Quick Add to cart",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          9 PRODUCT HOVER
                          <span className="absolute left-2/2 transform -translate-x-1/2 -top-3 bg-red-600 text-white text-[8px] px-1">
                            HOT
                            <span className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-[1px] border-r-[10px] border-t-[5px] border-transparent border-t-red-600 -mt-[2%]" />
                          </span>
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "Product Hover Style 1",
                              href: "#",
                            },
                            { text: "Product Hover Style 2", href: "#" },
                            {
                              text: "Product Hover Style 3",
                              href: "#",
                            },
                            {
                              text: "Product Hover Style 4",
                              href: "#",
                            },
                            {
                              text: "All Style",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          THEME ELEMENT
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "Ajax Search",
                              href: "#",
                            },
                            {
                              text: "Ajax Minicart",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },

                            {
                              text: "Recently Products",
                              href: "#",
                            },
                            {
                              text: "Social Share",
                              href: "#",
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <Image
                      src="https://winne-store-demo.myshopify.com/cdn/shop/t/2/assets/apmenuitem_ihtml_5.jpg?v=83108321846665516651653981678"
                      alt="Description of the image"
                      width={500}
                      height={300}
                      layout="responsive"
                    />
                  </DropdownContent>
                }
              />

              <NavItem
                label="pages"
                href="/pages"
                dropdownContent={
                  <DropdownContent customStyles="-ml-[100px] py-12 px-8 shadow-sm">
                    <div className="flex w-[590px] h-[367px]  justify-between flex-wrap">
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          DEMO LAYOUTS
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "Full Screen",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                            { text: "Heading Background", href: "#" },
                            {
                              text: "Simple",
                              href: "#",
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          PRE-BUILD PAGES
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "About Us #1",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                            { text: "About Us #2", href: "#" },
                            {
                              text: "About Us #3",
                              href: "#",
                            },
                            {
                              text: "About Us #4",
                              href: "#",
                            },
                            {
                              text: "Contact Us #1",
                              href: "#",
                            },
                            {
                              text: "Contact Us #2",
                              href: "#",
                            },
                            {
                              text: "Contact Us #3",
                              href: "#",
                            },
                            {
                              text: "FAQs",
                              href: "#",
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          ECOMERCE
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "Cart",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                            { text: "404 Page", href: "#" },
                            {
                              text: "My account",
                              href: "/account",
                            },
                            {
                              text: "Login/Register",
                              href: "account/login",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DropdownContent>
                }
              />

              <NavItem
                label="blogs"
                href="/blogs"
                dropdownContent={
                  <DropdownContent customStyles="-ml-[100px] py-12 px-8 shadow-sm cursor-default ">
                    <div className="flex w-[540px] h-[403px] justify-between flex-wrap">
                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          SINGLE POST
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            {
                              text: "No Sidebar",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                            { text: "Left Sidebar", href: "#" },
                            { text: "Right Sidebar", href: "#" },
                            { text: "Standard", href: "/single-post-standard" },
                            {
                              text: "Audio",
                              href: "#",
                              tooltip: { text: "HOT", color: "bg-red-600" },
                            },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          LAYOUT
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>
                        <ul className="flex flex-col gap-4 font-normal text-gray-500">
                          {[
                            { text: "No Sidebar", href: "#" },
                            {
                              text: "Left Sidebar",
                              href: "#",
                              tooltip: { text: "NEW", color: "bg-green-400" },
                            },
                            { text: "Right Sidebar", href: "#" },
                            { text: "Standard", href: "#" },
                            { text: "Blog List", href: "#" },
                            { text: "Grid", href: "#" },
                          ].map(({ text, href, tooltip }, index) => (
                            <li key={index} className="relative">
                              <a
                                className="hover:text-[#982B2B] transition-all"
                                href={href}
                              >
                                {text}
                              </a>
                              {tooltip && (
                                <Tooltip
                                  text={tooltip.text}
                                  color={tooltip.color}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col w-[285px] h-[417px] gap-4">
                        <a
                          className="hover:text-[#982B2B] transition-all relative"
                          href="#"
                        >
                          NEW PRODUCTS
                          <span className="absolute left-0 transform translate-x-2/2 bottom-0 border-b top-8 border-[#982B2B] w-[50%]" />
                        </a>

                        <ProductSwiper />
                      </div>
                    </div>
                  </DropdownContent>
                }
              />
            </ul>
          </nav>
          {isMenuOpen && (
            <div className="fixed inset-0 z-50">
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                onClick={toggleMenu}
              />

              <motion.div
                className={`bg-white h-full flex flex-col relative ${
                  activeMenu === "main"
                    ? "w-[75%] md:w-full"
                    : "w-[75%] md:w-[60%]"
                }`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
              >
                <div
                  className={`flex gap-1 items-center h-[54px] ${
                    activeMenu !== "main"
                      ? "bg-[#A53E4C] text-white pl-4"
                      : "border-b border-gray-300"
                  } `}
                >
                  {activeMenu === "main" ? (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="w-[160px] md:w-[180px] flex gap-2 items-center bg-[#111111] text-white justify-center h-[55px]">
                          <RxHamburgerMenu className="text-[21px] mb-[2px]" />
                          <button className="text-[15px] md:text-[18px]">
                            MENU
                          </button>
                        </div>
                        <div className="w-[160px] md:w-[180px] flex gap-2 items-center text-black justify-center h-[55px]">
                          <LuUser2 className="text-[21px] mb-[4px]" />
                          <a
                            href="/account"
                            className="text-[16px] md:text-[18px]"
                          >
                            LOGIN
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <AiOutlineLeft
                        className="text-[17px] flex items-center justify-center rounded"
                        onClick={() => setActiveMenu("main")}
                      />
                      <h2 className="text-xl font-semibold">{activeMenu}</h2>
                      <div />
                    </>
                  )}
                </div>

                {activeMenu === "main" && (
                  <motion.nav
                    className="flex flex-col flex-grow overflow-y-auto"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="w-full md:w-full h-[54px] flex items-center border">
                        <Link
                          href="/"
                          className="text-[17px] md:text-[19px] ml-3"
                        >
                          HOME
                        </Link>
                      </div>
                      <div className="w-[50px] h-[54px] flex items-center justify-center border">
                        <AiOutlineRight
                          onClick={() => handleSubMenu("Home")}
                          className="w-[15px] h-[15px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <div className="w-full md:w-full h-[54px] flex items-center border">
                        <Link
                          href="/Shop"
                          className="text-[17px] md:text-[19px] ml-3"
                        >
                          SHOP
                        </Link>
                      </div>
                      <div className="w-[50px] h-[54px] flex items-center justify-center border">
                        <AiOutlineRight
                          onClick={() => handleSubMenu("Shop")}
                          className="w-[15px] h-[15px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="w-full md:w-full h-[54px] flex items-center border">
                        <Link
                          href="/featured"
                          className="text-[17px] md:text-[19px] ml-3"
                        >
                          FEATURED
                        </Link>
                      </div>
                      <div className="w-[50px] h-[54px] flex items-center justify-center border">
                        <AiOutlineRight
                          onClick={() => handleSubMenu("Featured")}
                          className="w-[15px] h-[15px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="w-full md:w-full h-[54px] flex items-center border">
                        <Link
                          href="/pages"
                          className="text-[17px] md:text-[19px] ml-3"
                        >
                          PAGES
                        </Link>
                      </div>
                      <div className="w-[50px] h-[54px] flex items-center justify-center border">
                        <AiOutlineRight
                          onClick={() => handleSubMenu("Pages")}
                          className="w-[15px] h-[15px]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="w-full md:w-full h-[54px] flex items-center border">
                        <Link
                          href="/blogs"
                          className="text-[17px] md:text-[19px] ml-3"
                        >
                          BLOGS
                        </Link>
                      </div>
                      <div className="w-[50px] h-[54px] flex items-center justify-center border">
                        <AiOutlineRight
                          onClick={() => handleSubMenu("Blogs")}
                          className="w-[15px] h-[15px]"
                        />
                      </div>
                    </div>
                  </motion.nav>
                )}

                {activeMenu === "Home" && (
                  <motion.nav
                    className="flex flex-col flex-grow overflow-y-auto gap-4"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Link
                      href="/home-1"
                      onClick={toggleMenu}
                      className="text-black text-[16px]  md:text-[16px] h-[54px] flex items-center ml-5"
                    >
                      Home 1
                    </Link>
                    <Link
                      href="/home-2"
                      onClick={toggleMenu}
                      className="text-black text-[16px]  md:text-[16px] h-[54px] flex items-center ml-5"
                    >
                      Home 2
                    </Link>
                    <Link
                      href="/home-3"
                      onClick={toggleMenu}
                      className="text-black text-[16px]  md:text-[16px] h-[54px] flex items-center ml-5"
                    >
                      Home 3
                    </Link>
                    <Link
                      href="/home-4"
                      onClick={toggleMenu}
                      className="text-black text-[16px]  md:text-[16px] h-[54px] flex items-center ml-5"
                    >
                      Home 4
                    </Link>
                    <Link
                      href="/home-5"
                      onClick={toggleMenu}
                      className="text-black text-[16px]  md:text-[16px] h-[54px] flex items-center ml-5"
                    >
                      Home 5
                    </Link>
                  </motion.nav>
                )}

                {activeMenu === "Shop" && (
                  <motion.nav
                    className="flex flex-col flex-grow overflow-y-auto gap-4 scrollbar-hide"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        SHOP LAYOUTS
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <Link
                        href="/shop-layouts"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Fullwidth
                      </Link>
                      <Link
                        href="/sidebar-layouts"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Sidebar Layouts
                      </Link>
                      <Link
                        href="/infinity-scroll"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Infinity Scroll
                      </Link>
                      <Link
                        href="/background-modern"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Background Modern
                      </Link>
                      <Link
                        href="/list-view"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        List View
                      </Link>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        SHOP HEADING
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <Link
                        href="/heading-style-1"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Heading Style 1
                      </Link>
                      <Link
                        href="/heading-style-2"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Heading Style 2
                      </Link>
                      <Link
                        href="/heading-style-3"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Heading Style 3
                      </Link>
                      <Link
                        href="/heading-style-4"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Heading Style 4
                      </Link>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        FILTER LAYOUT
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <div className="relative group">
                        <Link
                          href="/drawer-filter"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Drawer Filter
                        </Link>
                        <span className="-top-1 ml-2 absolute  bg-green-400 text-white text-[9px] px-1">
                          NEW
                        </span>
                      </div>

                      <Link
                        href="/off-canvas"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Off Canvas
                      </Link>
                      <Link
                        href="/filter-sticky"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Filter Sticky
                      </Link>
                      <Link
                        href="/filter-dropdown"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Filter Dropdown
                      </Link>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Filter Accordion
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-red-600 text-white text-[9px] px-1">
                          HOT
                        </span>
                      </div>
                    </div>
                  </motion.nav>
                )}
                {activeMenu === "Featured" && (
                  <motion.nav
                    className="flex flex-col flex-grow overflow-y-auto gap-4 scrollbar-hide"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        ANIMATE DEMOS
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Quickview-Popup
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-blue-600 text-white text-[9px] px-1">
                          TREND
                        </span>
                      </div>
                      <Link
                        href="/sidebar-layouts"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Minicart Draws
                      </Link>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Quick Add to cart
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-green-600 text-white text-[9px] px-1">
                          NEW
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        9 PRODUCT HOVER
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <Link
                        href="/heading-style-1"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Product Hover Style 1
                      </Link>
                      <Link
                        href="/heading-style-2"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Product Hover Style 2
                      </Link>
                      <Link
                        href="/heading-style-3"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Product Hover Style 3
                      </Link>
                      <Link
                        href="/heading-style-4"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Product Hover Style 4
                      </Link>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          All Style
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-red-600 text-white text-[9px] px-1">
                          HOT
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        THEME ELEMENT
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <Link
                        href="/drawer-filter"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Ajax Search
                      </Link>

                      <div className="relative group">
                        <Link
                          href="/drawer-filter"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Ajax Minicart
                        </Link>
                        <span className="-top-1 ml-2 absolute  bg-green-400 text-white text-[9px] px-1">
                          NEW
                        </span>
                      </div>
                      <Link
                        href="/filter-sticky"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Filter Sticky
                      </Link>
                      <Link
                        href="/filter-dropdown"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Recently Products
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Social Share
                      </Link>
                    </div>
                  </motion.nav>
                )}
                {activeMenu === "Pages" && (
                  <motion.nav
                    className="flex flex-col flex-grow overflow-y-auto gap-4 scrollbar-hide"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        DEMO LAYOUTS
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Full Screen
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-green-600 text-white text-[9px] px-1">
                          New
                        </span>
                      </div>
                      <Link
                        href="/sidebar-layouts"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Heading Background
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Simple
                      </Link>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        PRE-BUILD PAGES
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          About Us #1
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-red-600 text-white text-[9px] px-1">
                          HOT
                        </span>
                      </div>
                      <Link
                        href="/heading-style-2"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        About Us #2
                      </Link>
                      <Link
                        href="/heading-style-3"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        About Us #3
                      </Link>
                      <Link
                        href="/heading-style-4"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        About Us #4
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Contact Us #1
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Contact Us #2
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        FaQs
                      </Link>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        ECOMERCE
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Cart
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-red-600 text-white text-[9px] px-1">
                          HOT
                        </span>
                      </div>

                      <Link
                        href="/filter-sticky"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        404 Page
                      </Link>
                      <Link
                        href="/filter-dropdown"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        My Account
                      </Link>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Login/Register
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-green-600 text-white text-[9px] px-1">
                          NEW
                        </span>
                      </div>
                    </div>
                  </motion.nav>
                )}
                {activeMenu === "Blogs" && (
                  <motion.nav
                    className="flex flex-col flex-grow overflow-y-auto gap-4 scrollbar-hide"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.3 },
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        SINGLE POST
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          No Sidebar
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-green-600 text-white text-[9px] px-1">
                          NEW
                        </span>
                      </div>
                      <Link
                        href="/sidebar-layouts"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Left Sidebar
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Right Sidebar
                      </Link>

                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Standar
                      </Link>

                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Audio
                      </Link>

                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Video
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-red-600 text-white text-[9px] px-1">
                          HOT
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pl-5 ">
                      <h3 className="font-semibold text-gray-900 text-lg relative">
                        LAYOUT
                        <span className="absolute bottom-0 left-0 w-1/2 h-[1.5px] bg-[#982B2B]"></span>
                      </h3>
                      <Link
                        href="/heading-style-1"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        No Sidebar
                      </Link>
                      <div className="relative group">
                        <Link
                          href="/filter-accordion"
                          onClick={toggleMenu}
                          className="text-gray-800 text-base hover:text-[#982B2B]"
                        >
                          Left Sidebar
                        </Link>
                        <span className="-top-1 ml-2 absolute bg-green-600 text-white text-[9px] px-1">
                          NEW
                        </span>
                      </div>
                      <Link
                        href="/heading-style-3"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Right Sidebar
                      </Link>
                      <Link
                        href="/heading-style-4"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Standar
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Blog List
                      </Link>
                      <Link
                        href="/filter-accordion"
                        onClick={toggleMenu}
                        className="text-gray-800 text-base hover:text-[#982B2B]"
                      >
                        Grid
                      </Link>
                    </div>
                  </motion.nav>
                )}

                <div className="absolute bottom-0 left-0 w-full flex justify-center bg-[#A53E4C] text-white h-[52px] md:h-[60px]">
                  <button
                    onClick={toggleMenu}
                    className="text-[12px] md:text-[14px]"
                  >
                    CLOSE
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          <IconButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
