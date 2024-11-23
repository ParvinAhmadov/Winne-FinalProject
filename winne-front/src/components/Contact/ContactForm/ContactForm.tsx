"use client";
import React, { useState } from "react";
import axios from "axios";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/messages",
        formData
      );
      console.log("Response:", response.data);

      setFormData({ name: "", email: "", message: "" });
      setStatus("Message sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="mt-[5rem] mb-[4rem] bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl  mb-6">Contact Form</h2>
        <div className="w-20 border-b-2 border-[#A53E4C] mx-auto mb-10"></div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col text-left">
              <label
                htmlFor="name"
                className="text-lg font-semibold mb-3 text-gray-800"
              >
                Name<span className="text-[#A53E4C]">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:border-[#A53E4C]"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col text-left">
              <label
                htmlFor="email"
                className="text-lg font-semibold mb-3 text-gray-800"
              >
                Email Address<span className="text-[#A53E4C]">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email Address"
                className="w-full border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:border-[#A53E4C]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <label
              htmlFor="message"
              className="text-lg font-semibold mb-3 text-gray-800"
            >
              Your Message<span className="text-[#A53E4C]">*</span>
            </label>
            <textarea
              id="message"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 px-4 py-3 text-lg h-40 focus:outline-none focus:border-[#A53E4C]"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-black text-white tracking-widest text-xl px-8 py-2 hover:bg-[#A53E4C] transition-all"
          >
            SUBMIT
          </button>
        </form>

        {status && <p className="mt-4 text-lg text-gray-700">{status}</p>}
      </div>
    </div>
  );
};

export default ContactForm;
