import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="mt-[5rem] mb-[4rem] bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl  mb-6">Contact Form</h2>
        <div className="w-20 border-b-2 border-[#A53E4C] mx-auto mb-10"></div>

        <form className="space-y-8">
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
      </div>
    </div>
  );
};

export default ContactForm;
