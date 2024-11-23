import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";

const ContactSection: React.FC = () => {
  return (
    <>
      <div className="relative w-full h-[300px] sm:h-[404px] mb-12">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Wishlist Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[24px] sm:text-[46px] mb-2">
            Contact Us
          </h1>
          <p className="text-white text-[12px] sm:text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[8px] sm:text-[10px]" />
            </span>
            Contact Us
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row max-w-[1170px] h-auto sm:h-[740px] mx-auto">
        <div
          className="w-full sm:w-1/2 bg-[#F7F7F7] px-6 sm:px-8 py-6 sm:py-16 flex flex-col justify-center"
          style={{
            backgroundImage:
              "url('https://winne-store-demo.myshopify.com/cdn/shop/files/pattern-bg.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2 className="text-lg sm:text-xl text-[#212529] tracking-widest mb-4 sm:mb-6">
            CONTACT INFORMATION
          </h2>
          <div className="border w-[30%] sm:w-[20%] border-[#A53E4C] mb-6 sm:mb-8"></div>
          <p className="text-[#969696] text-sm sm:text-base mb-4 sm:mb-6">
            We do not sell products from our corporate headquarters in New York
            City. If you want to visit, please reach out to our customer service
            team first.
          </p>
          <p className="text-[#969696] text-sm font-medium sm:text-base mb-4 sm:mb-6">
            <span className="mb-2">1201 Broadway</span>
            <br />
            Suite 600
          </p>
          <a
            href="mailto:help@example.com"
            className="text-[#212529] text-sm sm:text-lg md:text-[32px] md:mb-8 md:mt-8 font-semibold underline mb-8"
          >
            help@example.com
          </a>
          <h3 className="text-sm sm:text-lg text-[#212529] tracking-widest mb-4 mt-4">
            FOLLOW US
          </h3>
          <div className="border border-[#A53E4C] w-[20%] sm:w-[14%] mb-6"></div>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center hover:border-[#A53E4C] hover:bg-[#A53E4C] hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center hover:border-[#A53E4C] hover:bg-[#A53E4C] hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center hover:border-[#A53E4C] hover:bg-[#A53E4C] hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black flex items-center justify-center hover:border-[#A53E4C] hover:bg-[#A53E4C] hover:text-white transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="w-full sm:w-1/2 h-[250px] sm:h-full">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.015933730924!2d-122.41990628467559!3d37.77492927975988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064e68bcd81%3A0x13b44a64cf2fba72!2s1201%20Broadway%2C%20Oakland%2C%20CA%2094607%2C%20USA!5e0!3m2!1sen!2sus!4v1635887008460!5m2!1sen!2sus"
            className="w-full h-full"
            style={{
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
