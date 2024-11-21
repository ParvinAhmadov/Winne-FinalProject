"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

const HomeImageSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      src: "https://winne-store-demo.myshopify.com/cdn/shop/files/bn1.1.png?v=1653892975",
      title: "Suggestions for you",
      secondaryTitle: "Wine Collection",
      subtitle: "Find & Buy Premium Fine Wines Here!",
      buttonText: "SHOP NOW",
    },
    {
      src: "https://winne-store-demo.myshopify.com/cdn/shop/files/bn1.2.png?v=1653892990",
      title: "Suggestions for you",
      secondaryTitle: "Organic Winery",
      subtitle: "Find & Buy Premium Fine Wines Here!",
      buttonText: "SHOP NOW",
    },
  ];

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      onSlideChange={handleSlideChange}
      modules={[Pagination]}
      className="mySwiper w-full h-screen"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {currentIndex === index && (
                <motion.img
                  key={index}
                  src={slide.src}
                  alt={`Slide ${index + 1}`}
                  className="absolute w-full h-full object-cover"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            <div className="absolute top-[32%] left-[5%] md:left-[15%] text-left max-w-xl">
              <AnimatePresence mode="wait">
                {currentIndex === index && (
                  <>
                    <motion.h2
                      key={slide.title}
                      className="text-lg md:text-2xl tracking-widest text-[#303030] mb-2"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {slide.title}
                    </motion.h2>

                    <motion.h3
                      key={slide.secondaryTitle}
                      className="text-[40px] md:text-[70px] font-bold text-black mb-6"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {slide.secondaryTitle}
                    </motion.h3>

                    <motion.p
                      key={slide.subtitle}
                      className="text-sm md:text-[20px] text-[#111111] mb-8"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.a
                      key={slide.buttonText}
                      href="/product"
                      className="py-2 px-4 md:py-2 md:px-6 tracking-widest bg-black text-white hover:bg-transparent hover:text-black border border-black hover:transition-all hover:duration-300 inline-block"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      {slide.buttonText}
                    </motion.a>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeImageSwiper;
