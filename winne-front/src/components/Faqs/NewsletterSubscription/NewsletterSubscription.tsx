import React from "react";

const NewsletterSubscription: React.FC = () => {
  return (
    <div className="py-16 bg-white mt-8">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl  mb-4">
          Never miss our updates about new arrivals and special offers
        </h2>
        <p className="text-[#212529] mb-8">Get the latest news & updates</p>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border-b border-black px-4 py-3 text-black outline-none focus:ring-0 focus:border-gray-300"
          />
          <button
            type="submit"
            className="w-full bg-[#A53E4C] text-white font-semibold tracking-widest text-[15px] px-6 py-3  hover:bg-black transition duration-300"
          >
            SUBSCRIBE NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
