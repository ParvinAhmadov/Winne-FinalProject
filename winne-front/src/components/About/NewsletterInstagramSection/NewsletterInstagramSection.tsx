import React from "react";
import { FaInstagram } from "react-icons/fa";
import { LuMailQuestion } from "react-icons/lu";

const NewsletterInstagramSection: React.FC = () => {
  const instagramPosts = [
    "https://winne-store-demo.myshopify.com/cdn/shop/files/instagram2.jpg?v=7464478969250703187",
    "https://winne-store-demo.myshopify.com/cdn/shop/files/instagram3.jpg?v=16613049484455551285",
    "https://winne-store-demo.myshopify.com/cdn/shop/files/instagram4.jpg?v=11828007869279761427",
    "https://winne-store-demo.myshopify.com/cdn/shop/files/instagram5.jpg?v=13156160657635492590",
    "https://winne-store-demo.myshopify.com/cdn/shop/files/instagram6.jpg?v=2127389000834969036",
    "https://winne-store-demo.myshopify.com/cdn/shop/files/instagram7.jpg?v=11558096119736735026",
  ];

  return (
    <div className="bg-white">
      <div
        className="relative h-[360px] bg-cover bg-center flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left"
        style={{
          backgroundImage:
            "url('https://winne-store-demo.myshopify.com/cdn/shop/files/img-newsletter.png?v=1653967928')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row  items-center justify-center gap-6 text-white max-w-[1200px] h-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 text-center md:items-center sm:text-left">
            <LuMailQuestion className="text-[64px] sm:text-[48px]" />
            <div className="flex flex-col gap-2 max-w-full sm:max-w-[400px] md:border-l pl-4">
              <div className="text-[24px] sm:text-[26px]">
                <p className="tracking-widest">OUR</p>
                <h2 className="font-bold tracking-widest">NEWSLETTER!</h2>
              </div>
              <p className="text-sm sm:text-lg leading-relaxed">
                It only takes a second to be the first to find out about our
                latest news.
              </p>
            </div>
          </div>

          <form className="flex flex-col sm:flex-row items-center bg-white shadow-lg w-full max-w-full sm:max-w-[500px]">
            <input
              type="email"
              placeholder="Your email address..."
              className="w-full px-4 py-3 text-black outline-none sm:flex-1 sm:py-4"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-black px-6 py-3 sm:py-5 text-white font-semibold tracking-widest text-[12px] hover:bg-[#A53E4C] transition-all"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <div className="relative w-full mt-0">
        <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 z-10 bg-white px-6 py-3   shadow-lg flex items-center gap-2">
          <FaInstagram className="text-pink-600 text-3xl" />
          <span className="text-lg text-[#212529] font-medium">
            Follow Us On Instagram
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full">
          {instagramPosts.map((post, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden"
            >
              <img
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-[150px] sm:h-[200px] md:h-[282px] object-cover transform transition-transform duration-[1500ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterInstagramSection;
