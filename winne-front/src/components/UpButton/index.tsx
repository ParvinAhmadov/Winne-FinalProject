"use client";
import React, { useEffect, useState } from "react";
import { TfiAngleUp } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";

const UpButton: React.FC = () => {
  const [showUpButton, setShowUpButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / windowHeight) * 100;
      setScrollProgress(scrollPercentage);

      setShowUpButton(scrollTop > 300);
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showUpButton && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-20 right-0 mr-0 w-[50px] h-[50px] bg-white text-xl flex items-center justify-center shadow-md transition-all transform translate-x-1/2 "
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <TfiAngleUp className="absolute text-[#982B2B]" />
          <div
            className="bg-[#982B2B]  w-full h-full flex items-center justify-center"
            style={{
              clipPath: `inset(${100 - scrollProgress}% 0 0 0)`,
            }}
          >
            <TfiAngleUp className="absolute text-white" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default UpButton;
