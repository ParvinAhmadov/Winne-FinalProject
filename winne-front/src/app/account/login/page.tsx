import React from "react";

const LoginPage = () => {
  return (
    <section>
      <div className="flex justify-center max-w-[1200px] w-full mx-auto items-center min-h-screen bg-white">
        {/* Login Section */}
        <div className="w-1/2 px-10 border-r border-gray-300">
          <h2 className="text-2xl font-semibold mb-8 text-center tracking-wide">LOGIN</h2>
          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <label className="text-lg font-medium w-1/3 text-right" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="border-b border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 flex-grow"
                placeholder="Email address"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-lg font-medium w-1/3 text-right" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-b border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 flex-grow"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-black text-white py-3 px-12 font-semibold rounded-none">
                LOG IN
              </button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-500 flex justify-center gap-8">
              <a href="/" className="hover:underline">
                Return to Store
              </a>
              <a href="/" className="hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="w-4"></div>

        {/* Register Section */}
        <div className="w-1/2 px-10">
          <h2 className="text-2xl font-semibold mb-8 text-center tracking-wide">REGISTER</h2>
          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <label className="text-lg font-medium w-1/3 text-right" htmlFor="reg-email">
                Email address
              </label>
              <input
                type="email"
                id="reg-email"
                className="border-b border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 flex-grow"
                placeholder="Email address"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-lg font-medium w-1/3 text-right" htmlFor="reg-password">
                Password
              </label>
              <input
                type="password"
                id="reg-password"
                className="border-b border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 flex-grow"
                placeholder="Password"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-black text-white py-3 px-12 font-semibold rounded-none">
                REGISTER
              </button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-500">
              <a href="/" className="hover:underline">
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
