import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 w-full max-w-[1110px] mx-auto mt-20 mb-20 bg-white">
      <h1 className="text-[80px] md:text-[100px] font-extrabold text-[#212529] leading-none">
        404
      </h1>

      <h2 className="text-xl md:text-2xl lg:text-[30px] font-bold text-[#212529] mt-4 text-center">
        Oops! That Page Can’t Be Found.
      </h2>

      <p className="text-sm md:text-base lg:text-[16px] text-gray-500 mt-4 text-center">
        THE PAGE YOU ARE LOOKING FOR DOES NOT EXITS
      </p>

      <a
        href="/"
        className="mt-6 text-sm md:text-base lg:text-[14px] text-[#A8A8A8] font-medium cursor-default"
      >
        Please return to{" "}
        <span className="text-[#A53E4C] cursor-pointer">Home page</span>
      </a>

      <div className="flex items-center w-full max-w-md mt-6">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 border border-gray-300 h-[45px] md:h-[50px] px-4 text-sm md:text-base focus:outline-none"
        />
        <button className="bg-[#212529] text-white px-4 h-[45px] md:h-[50px] hover:bg-[#A53E4C] transition ease duration-200 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
