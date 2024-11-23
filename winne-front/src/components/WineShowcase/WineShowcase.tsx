import React from "react";

const WineShowcase: React.FC = () => {
  return (
    <div
      className="flex items-center justify-start bg-cover bg-center bg-no-repeat h-[660px] text-black py-10 px-4 md:py-16 md:mt-8"
      style={{
        backgroundImage:
          "url('https://winne-store-demo.myshopify.com/cdn/shop/files/bn1.5.png?v=1653894743')", // Replace with your image path
      }}
    >
      <div className="flex flex-col items-start text-left max-w-[800px] space-y-4 md:space-y-6 ml-0 md:ml-[10%]">
        <h1 className="text-[24px] leading-snug font-bold md:text-[60px] md:leading-tight">
          Quality Wine From The Vine
        </h1>
        <p className="text-sm text-[#222222] leading-normal md:text-[20px] md:leading-relaxed">
          Wine is an alcoholic beverage fermented from grapes. The natural
          chemical balance allows grapes to ferment without added sugar.
        </p>
        <a
          href="/product"
          className="bg-black text-white py-2 px-6 text-sm md:text-[16px] font-medium hover:bg-[#A53E4C] transition duration-300"
        >
          SHOP NOW
        </a>
      </div>
    </div>
  );
};

export default WineShowcase;
