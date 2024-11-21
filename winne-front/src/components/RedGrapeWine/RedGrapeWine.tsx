"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaAngleDoubleRight } from "react-icons/fa";

interface WineCardProps {
  WineimgSrc: string;
  Winetitle: string;
  Wineprice: string;
  Winelink: string;
}

const WineCard: React.FC<WineCardProps> = ({
  WineimgSrc,
  Winetitle,
  Wineprice,
  Winelink,
}) => {
  return (
    <div className="relative overflow-hidden group">
      <picture>
        <img
          src={WineimgSrc}
          alt={Winetitle}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </picture>

      <motion.div
        className="absolute inset-0 hidden md:flex flex-col justify-center items-center gap-2 font-semibold bg-white bg-opacity-70 scale-110 group-hover:scale-90 transition-all duration-500 ease-in-out"
        initial={{ opacity: 0, scale: 1 }}
        whileHover={{
          opacity: 1,
          scale: 0.9,
          transition: { duration: 0.6 },
        }}
      >
        <motion.h2
          className="text-black text-2xl md:text-[40px] mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          From {Wineprice}
        </motion.h2>
        <motion.p
          className="text-black text-lg md:text-[40px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          {Winetitle}
        </motion.p>
        <motion.a
          href={Winelink}
          className="mt-2 flex items-center gap-1 hover:text-[#982B2B] text-[#444444] font-semibold transition-colors duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
        >
          View More
          <FaAngleDoubleRight />
        </motion.a>
      </motion.div>

      <div className="absolute top-4 inset-0 flex flex-col justify-center items-center w-[300px] mx-auto h-[180px] bg-white bg-opacity-70 scale-110 md:hidden">
        <h2 className="text-black text-[26px] font-semibold">
          From {Wineprice}
        </h2>
        <p className="text-black text-[26px] font-semibold">{Winetitle}</p>
        <a
          href={Winelink}
          className="mt-2 flex items-center gap-1 hover:text-[#982B2B] text-[#444444] font-semibold transition-colors duration-300"
        >
          View More
          <FaAngleDoubleRight />
        </a>
      </div>
    </div>
  );
};

const RedGrapeWine: React.FC = () => {
  return (
    <section className="w-full py-10 flex justify-center items-center">
      <div className="max-w-[1450px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0 mx-auto">
        <WineCard
          WineimgSrc="https://winne-store-demo.myshopify.com/cdn/shop/files/bn1.3.png?v=1653894772"
          Winetitle="Red Wine"
          Wineprice="$50"
          Winelink="/product"
        />{" "}
        <WineCard
          WineimgSrc="https://winne-store-demo.myshopify.com/cdn/shop/files/bn1.4.png?v=1653894783"
          Winetitle="Grape Wine"
          Wineprice="$60"
          Winelink="/product"
        />
      </div>
    </section>
  );
};

export default RedGrapeWine;
