"use client";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const EmailSignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const closedModal = localStorage.getItem("ClosedModal");
      if (!closedModal) {
        setIsOpen(true);
      }
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem("ClosedModal", "true");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2d2d32cc] bg-opacity-70 flex items-center justify-center z-[9999]">
      <div className="bg-white w-[90%] md:w-[720px] lg:w-[920px] h-auto lg:h-[497px] text-center shadow-lg z-[10000]">
        <div className="relative w-full  lg:w-[886px] h-auto lg:h-[463px] mx-auto mt-4 lg:border-2 ">
          <div className="flex items-center w-full lg:w-[520px] h-full lg:h-[463px] mx-auto py-[20px] lg:pb-[45px] lg:pt-[45px] flex-col">
            <button
              className="absolute top-4 right-4 md:top-6 md:right-8 text-black text-2xl font-bold focus:outline-none p-1 border border-black rounded-full"
              onClick={closeModal}
              title="Close"
            >
              <IoMdClose />
            </button>
            <h3 className="text-[20px] lg:text-[22px] font-semibold border-b-2 border-[#BC9E6B] color-[#333] mb-[20px] lg:mb-[30px] pb-[10px] lg:pb-[20px] relative tracking-wide uppercase">
              SIGNUP FOR EMAILS
            </h3>
            <p className="text-[28px] md:text-[30px] lg:text-[35px] font-semibold pb-[10px] mb-[15px] lg:mb-[20px]">
              GET 20% DISCOUNT SHIPPED TO YOUR INBOX
            </p>
            <p className="text-base text-black mb-4">
              Subscribe to our newsletter and we will ship 20% discount code
              today.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row mt-4 md:mt-6"
            >
              <input
                type="email"
                placeholder="Enter Your Email ..."
                className="w-full md:w-[340px] lg:w-[323px] h-[50px] p-3 border mb-4 md:mb-0  border-gray-300 focus:outline-none placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="w-full md:w-auto bg-black text-white py-3 px-8 font-medium hover:bg-[#BC9E6B] transition ease-in-out duration-200"
              >
                SUBSCRIBE
              </button>
            </form>
            <button
              className="text-black font-bold mt-6 lg:mt-10 underline hover:no-underline text-[14px] lg:text-[16px]"
              onClick={closeModal}
            >
              No, Thanks.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSignupModal;
