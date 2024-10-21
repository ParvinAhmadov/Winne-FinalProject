"use client";
import React, { useState, useEffect } from "react";

const EmailSignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const ClosedModal = localStorage.getItem("ClosedModal");
    if (!ClosedModal) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem("ClosedModal", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg max-w-lg w-full text-center">
        <button
          className="absolute top-2 right-2 text-gray-600 text-xl font-bold focus:outline-none"
          onClick={closeModal}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-2">SIGNUP FOR EMAILS</h2>
        <p className="text-lg font-medium mb-4">
          GET 20% DISCOUNT SHIPPED TO YOUR INBOX
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Subscribe to our newsletter and we will ship 20% discount code today.
        </p>
        <form>
          <input
            type="email"
            placeholder="Enter Your Email..."
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            SUBSCRIBE
          </button>
        </form>
        <button
          className="mt-4 text-gray-500 hover:underline focus:outline-none"
          onClick={closeModal}
        >
          No, Thanks.
        </button>
      </div>
    </div>
  );
};

export default EmailSignupModal;
