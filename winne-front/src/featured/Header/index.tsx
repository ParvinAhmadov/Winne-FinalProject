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

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

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
      <div className="max-w-[1450px] mx-auto ml-[9%] h-[42px]">
        <div className=" flex justify-between items-center">
          <div>
            <Link href="/">
              <Image
                src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
                className="w-[140px] h-[30px]"
                alt="Logo"
                width={140}
                height={30}
                layout="fixed"
              />
            </Link>
          </div>
          <nav className="relative w-[960px] h-[42px] flex justify-center">
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
          <IconButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
