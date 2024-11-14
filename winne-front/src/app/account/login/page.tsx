"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resetEmail, setResetEmail] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [loadingReset, setLoadingReset] = useState<boolean>(false);
  const [loginErrors, setLoginErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    const errors = { email: "", password: "" };

    
    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setLoginErrors(errors);

    if (errors.email || errors.password) {
      return;
    }

    setLoadingLogin(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, role, message } = response.data;

      toast.success(message || "Logged in successfully!");
      localStorage.setItem("token", token);

      window.location.href = role === "admin" ? "/admin" : "/account";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed!");
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = { email: "", password: "" }; 
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!registerEmail) {
      errors.email = "Email is required";
    }

    if (!registerPassword) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(registerPassword)) {
      errors.password =
        "Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.";
    }

    setRegisterErrors(errors);

    if (errors.email || errors.password) {
      return;
    }

    setLoadingRegister(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          email: registerEmail,
          password: registerPassword,
          role: "user",
        }
      );
      toast.success(response.data.message || "Registered successfully!");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Registration failed!");
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingReset(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/forgot-password",
        { email: resetEmail }
      );
      toast.success(response.data.message || "Password reset email sent!");
      setResetEmail("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Reset password failed!");
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <section className="bg-white">
        <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between max-w-[1450px] sm:h-[405px] w-full mx-auto mb-[70px]">
        <div className="w-full sm:w-[600px] sm:h-[405px] sm:pt-[100px] px-4 py-8">
          <h2 className="text-[18px] font-semibold mb-8 text-center tracking-wide">
            {isResetPassword ? "RESET PASSWORD" : "LOGIN"}
          </h2>

          {!isResetPassword ? (
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <label className="text-lg w-full sm:w-[150px]" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 ${
                    loginErrors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email address"
                />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <label
                  className="text-lg w-full sm:w-[150px]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 ${
                    loginErrors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  className="custom-button"
                  type="submit"
                  disabled={loadingLogin}
                >
                  {loadingLogin ? "Processing..." : "LOGIN"}
                </button>
              </div>

              <div className="text-center text-sm mt-4 flex flex-col sm:flex-row justify-center gap-6">
                <a href="/" className="text-[#212529] hover:text-[#A53E4C]">
                  Return to Store
                </a>
                <span
                  onClick={() => setIsResetPassword(true)}
                  className="text-[#212529] hover:text-[#A53E4C] cursor-pointer"
                >
                  Forgot your password?
                </span>
              </div>
            </form>
          ) : (
            <form
              className="flex flex-col gap-6"
              onSubmit={handleResetPassword}
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <label
                  className="text-lg w-full sm:w-[150px]"
                  htmlFor="reset-email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  className="custom-button"
                  type="submit"
                  disabled={loadingReset}
                >
                  {loadingReset ? "Processing..." : "RESET"}
                </button>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsResetPassword(false)}
                  className="text-[#212529] hover:text-[#A53E4C] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="w-full sm:w-[600px] sm:h-[405px] sm:pt-[100px] px-4 py-8 pb-[100px]">
          <h2 className="text-[18px] font-semibold mb-8 text-center tracking-wide">
            REGISTER
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
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
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className={`border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 ${
                  registerErrors.email ? "border-red-500" : ""
                }`}
                placeholder="Email address"
              />
              {registerErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.email}
                </p>
              )}
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
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className={`border-b w-full focus:border-black border-gray-400 p-2 text-gray-700 focus:outline-none placeholder-gray-400 ${
                  registerErrors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
              />
              {registerErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {registerErrors.password}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="custom-button"
                type="submit"
                disabled={loadingRegister}
              >
                {loadingRegister ? "Processing..." : "REGISTER"}
              </button>
            </div>

            <div className="text-center text-sm mt-4">
              <a href="/" className="text-[#212529] hover:text-[#A53E4C]">
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
