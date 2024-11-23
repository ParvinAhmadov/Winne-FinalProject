import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
const AboutContent: React.FC = () => {
  const sections = [
    {
      title: "Our Story",
      subtitle: "THE HIGH STRESS FAVOURITE",
      content: `
        Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. 
        Vestibulum volutpat pretium libero. In ut quam vitae odio lacinia tincidunt. 
        Etiam ut purus mattis mauris sodales aliquam. Aenean massa.
        
        In dui magna, posuere eget, vestibulum et, tempor auctor, justo. 
        Vivamus consectetuer hendrerit lacus. In hac habitasse platea dictumst. 
        Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      `,
      image:
        "https://winne-store-demo.myshopify.com/cdn/shop/files/about1.1.png?v=1654050555",
      reverse: true,
    },
    {
      title: "Who We Are ?",
      subtitle: "THE HIGH STRESS FAVOURITE",
      content: `
        Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. 
        Vestibulum volutpat pretium libero. In ut quam vitae odio lacinia tincidunt. 
        Etiam ut purus mattis mauris sodales aliquam. Aenean massa.
        
        In dui magna, posuere eget, vestibulum et, tempor auctor, justo. 
        Vivamus consectetuer hendrerit lacus. In hac habitasse platea dictumst. 
        Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      `,
      image:
        "https://winne-store-demo.myshopify.com/cdn/shop/files/about1.2.png?v=1654050555",
      reverse: false,
    },
  ];

  return (
    <div className="py-10 bg-white">
      <div className="relative w-full h-[404px] mb-[5%]">
        <Image
          src="https://winne-store-demo.myshopify.com/cdn/shop/files/heading-about.png?v=1653993348"
          alt="Wishlist Background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-[46px]  mb-2"> About Us</h1>
          <p className="text-white text-[15px] flex items-center gap-2">
            <a href="/" className="hover:text-[#A53E4C]">
              Home
            </a>
            <span>
              <FaChevronRight className="text-[10px]" />
            </span>
            About Us
          </p>
        </div>
      </div>
      <div className="max-w-[1450px] mx-auto px-4 md:px-0 space-y-20">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              section.reverse ? "md:flex-row-reverse" : ""
            } md:justify-center gap-8 md:gap-12`}
          >
            <div className="w-full md:w-1/2 max-w-[550px] mx-auto md:mx-0">
              <div className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <picture>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto object-cover"
                  />
                </picture>
              </div>
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-semibold text-[#212529]">
                {section.title}
              </h2>
              <div className="w-[50px] tracking-widest h-[2px] bg-[#A53E4C] my-4 mx-auto md:mx-0"></div>
              <h3 className="text-sm font-medium uppercase text-gray-500 mb-6">
                {section.subtitle}
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutContent;
