import React from "react";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";

const SosialMedia = () => {
  return (
    <div className="flex justify-center gap-6 border-t border-b py-4 mt-10 mr-4 ml-4 ">
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#212529] border p-2 rounded-full hover:bg-[#A53E4C] hover:text-white transition duration-200"
      >
        <FaTwitter />
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#212529] border p-2 rounded-full hover:bg-[#A53E4C] hover:text-white transition duration-200"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://pinterest.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#212529] border p-2 rounded-full hover:bg-[#A53E4C] hover:text-white transition duration-200"
      >
        <FaPinterestP />
      </a>
    </div>
  );
};

export default SosialMedia;
