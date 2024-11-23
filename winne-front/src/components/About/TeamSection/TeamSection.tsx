import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Karen Ryan",
      role: "Developer",
      image:
        "https://winne-store-demo.myshopify.com/cdn/shop/files/about1.7.png?v=1653894988",
      socials: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        pinterest: "https://pinterest.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Adrian Stone",
      role: "CEO",
      image:
        "https://winne-store-demo.myshopify.com/cdn/shop/files/about1.4.png?v=1653894988",
      socials: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        pinterest: "https://pinterest.com",
        instagram: "https://instagram.com",
      },
    },

    {
      name: "Saga Norén",
      role: "Designer",
      image:
        "https://winne-store-demo.myshopify.com/cdn/shop/files/about1.6.png?v=1653894988",
      socials: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        pinterest: "https://pinterest.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  return (
    <div className="py-10 bg-white">
      <div className="max-w-[1200px] mx-auto text-center px-4">
        <h2 className="text-5xl  mb-4 mt-2">Behind The Brands</h2>
        <div className="flex flex-col items-center mb-8">
          <p className="text-[#212529] mb-10">
            We are a female-founded, 100% woman-led team of collaborative
            dreamers who value innovation, curiosity and free-thinking
            fearlessness in everything that we do. We take immeasurable pride in
            our work, intentionally stitching love into the very fiber and
            fabric of our designs. We are small, but we are a mighty group of
            talented individuals dedicated to bringing you otherworldly designs
            with imagery to match.
          </p>
          <div className="border-2 w-[5%] border-[#A53E4C] "></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative group w-[352px] h-[352px] overflow-hidden cursor-pointer ">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 "
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-500 flex items-center justify-center">
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <a
                      href={member.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-2xl border-2 border-white  p-2 hover:text-white hover:border-[#A53E4C] hover:bg-[#A53E4C] transition-all duration-300"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-2xl border-2 border-white  p-2 hover:text-white hover:border-[#A53E4C] hover:bg-[#A53E4C] transition-all duration-300"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={member.socials.pinterest}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-2xl border-2 border-white  p-2 hover:text-white hover:border-[#A53E4C] hover:bg-[#A53E4C]  transition-all duration-300"
                    >
                      <FaPinterestP />
                    </a>
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-2xl border-2 border-white  p-2 hover:text-white hover:border-[#A53E4C]   hover:bg-[#A53E4C]  transition-all duration-300"
                    >
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold hover:text-[#A53E4C] cursor-pointer">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
