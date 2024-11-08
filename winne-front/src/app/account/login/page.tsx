import React from "react";

const LoginPage = () => {
  return (
    <section className="bg-white">
      <div className="flex flex-col sm:flex-row justify-between max-w-[1450px] sm:h-[405px] w-full mx-auto">
        <div className="w-full sm:w-[600px] sm:h-[405px] sm:pt-[100px] px-4 py-8">
          <h2 className="text-[18px] font-semibold mb-8 text-center tracking-wide">
            LOGIN
          </h2>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <label className="text-lg w-full sm:w-[150px]" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Email address"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <label className="text-lg w-full sm:w-[150px]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button className="custom-button">LOG IN</button>
            </div>

            <div className="text-center mt-2 text-sm text-black flex flex-col sm:flex-row justify-center gap-6">
              <a href="/" className="hover:text-[#A53E4C]">
                Return to Store
              </a>
              <a href="/" className="hover:text-[#A53E4C]">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>

        <div className="w-full h-[1px] bg-gray-300 my-8 sm:my-0 sm:w-[120px] sm:h-[405px] sm:bg-transparent"></div>

        <div className="w-full sm:w-[600px] sm:h-[405px] sm:pt-[100px] px-4 py-8">
          <h2 className="text-[18px] font-semibold mb-8 text-center tracking-wide">
            REGISTER
          </h2>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <label
                className="text-lg w-full sm:w-[150px]"
                htmlFor="reg-email"
              >
                Email address
              </label>
              <input
                type="email"
                id="reg-email"
                className="border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Email address"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <label
                className="text-lg w-full sm:w-[150px]"
                htmlFor="reg-password"
              >
                Password
              </label>
              <input
                type="password"
                id="reg-password"
                className="border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center mt-6">
              <div className="flex justify-center">
                <button className="custom-button">REGISTER</button>
              </div>
            </div>

            <div className="text-center mt-2 text-sm text-black">
              <a href="/" className="hover:text-[#A53E4C]">
                Return to Store
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
