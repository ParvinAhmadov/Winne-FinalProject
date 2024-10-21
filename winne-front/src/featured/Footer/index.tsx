import React from "react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";
import { FaBehance, FaDribbble, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 py-10 ">
      <div className="max-w-[1450px] mx-auto ml-[9%] px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
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
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <BsTwitterX />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <FaDribbble />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <FaBehance />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 relative">
              Help & Information
              <span className="absolute left-0 -bottom-3 w-[10%] border-b-2 border-black"></span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-black">
                  Pagination
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Home page
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Term of us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 relative">
              About Us
              <span className="absolute left-0 -bottom-3 w-[10%] border-b-2 border-black"></span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-black">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Address Store
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Receivers & Amplifiers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Clothings
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-8 relative">
              Categories
              <span className="absolute left-0 -bottom-3 w-[10%] border-b-2 border-black"></span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-[#982B2B] ">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Legal Notice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Secure payment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Stores
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 px-[10%] border-t  flex items-center justify-between pt-[2%]   text-[#111111]">
        <p>&copy; Copyright 2023 | Winne By EngoTheme. Powered by Shopify.</p>
        <div className="flex space-x-4">
          <Image
            src="https://winne-store-demo.myshopify.com/cdn/shop/files/payment.png?v=1653894988"
            alt="Visa"
            width={247}
            height={25}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
