import React from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaRedoAlt, FaShieldAlt } from "react-icons/fa";
import { SlPlane } from "react-icons/sl";

export default function InfoSection() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 px-4 sm:px-[24px] py-8">
      <div className="flex flex-col gap-4 items-center border px-8 sm:px-16 py-4">
        <SlPlane className="text-3xl text-[#A53E4C]" />
        <h3 className="tracking-widest text-center sm:text-left">
          WORLDWIDE SHIPPING
        </h3>
      </div>
      <div className="flex flex-col gap-4 items-center border px-8 sm:px-16 py-4">
        <FaRedoAlt className="text-3xl text-[#A53E4C] mb-2" />
        <h3 className="tracking-widest text-center sm:text-left">
          FREE 60-DAY RETURNS
        </h3>
      </div>
      <div className="flex flex-col gap-4 items-center border px-8 sm:px-16 py-4">
        <AiOutlineSafetyCertificate className="text-3xl text-[#A53E4C] mb-2" />
        <h3 className="tracking-widest text-center sm:text-left">
          24 MONTH WARRANTY
        </h3>
      </div>
      <div className="flex flex-col gap-4 items-center border px-8 sm:px-16 py-4">
        <FaShieldAlt className="text-3xl text-[#A53E4C] mb-2" />
        <h3 className="tracking-widest text-center sm:text-left">
          100% SECURE CHECKOUT
        </h3>
      </div>
    </div>
  );
}
