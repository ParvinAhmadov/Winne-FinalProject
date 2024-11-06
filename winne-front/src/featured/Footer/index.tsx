import React from "react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaBehance, FaDribbble, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t mt-10 py-10">
      <div className="max-w-[1450px] md:pl-[1.5%] text-center">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <Image
              src="https://winne-store-demo.myshopify.com/cdn/shop/files/logo.png?v=1653980231"
              alt="Winne"
              width={140}
              height={30}
            />
            <p className="text-gray-600 mb-4 mt-4">
              Sophisticated simplicity for <br />
              the independent mind.
            </p>
            <div className="flex space-x-4 mt-4 justify-center">
              <a
                href="#"
                className="text-gray-600 hover:text-[#982B2B] transition duration-300"
              >
                <BsTwitterX size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#982B2B] transition duration-300"
              >
                <FaDribbble size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#982B2B] transition duration-300"
              >
                <FaBehance size={20} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#982B2B] transition duration-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Help & Information
              <span className="block w-[50%] mx-auto mt-2 border-b-2 border-black"></span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Pagination
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Home page
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Term of us
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              About Us
              <span className="block w-[50%] mx-auto mt-2 border-b-2 border-black"></span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Address Store
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Receivers & Amplifiers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Clothings
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Categories
              <span className="block w-[50%] mx-auto mt-2 border-b-2 border-black"></span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Secure payment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#982B2B]">
                  Stores
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 md:pl-[6.2%] md:pr-[6.2%] border-t pt-6 flex flex-col md:flex-row md:justify-between items-center justify-center text-center text-gray-700 text-sm">
        <p className="mb-4 md:mb-0">
          &copy; 2023 |{" "}
          <a
            href="#"
            className="hover:text-gray-500 border-b border-transparent hover:border-[#982B2B] transition-all"
          >
            Winne
          </a>{" "}
          By{" "}
          <a
            href="#"
            className="hover:text-gray-500 border-b border-transparent hover:border-[#982B2B] transition-all"
          >
            EngoTheme
          </a>
          . Powered by{" "}
          <a href="#" className="hover:text-gray-500 transition-all">
            Shopify
          </a>
          .
        </p>
        <div className="mt-4 md:mt-0">
          <Image
            src="https://winne-store-demo.myshopify.com/cdn/shop/files/payment.png?v=1653894988"
            alt="Payment Methods"
            width={247}
            height={25}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
