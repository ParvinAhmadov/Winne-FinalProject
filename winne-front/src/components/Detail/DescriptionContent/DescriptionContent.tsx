import React from "react";
import { motion } from "framer-motion";

export default function DescriptionContent() {
  return (
    <motion.div
      key="description"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 grid grid-cols-1 gap-6"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src="https://cdn.shopify.com/s/files/1/0587/7687/9243/files/1.jpg?v=1652685359"
          alt="Wine History"
          className="w-full md:w-1/2 h-auto  shadow-lg"
        />
        <div>
          <h2 className="text-xl font-bold mb-2">Wine History</h2>
          <p className="text-[#969696]">
            Wine is an alcoholic beverage fermented from grapes. The natural
            chemical balance allows grapes to ferment without the need for added
            sugars, acids, enzymes, water or other nutrients. Yeast consumes the
            sugars in the grapes and converts them into alcohol and carbon
            dioxide. Different grape varieties and different yeast strains form
            different forms of wine.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div>
          <h2 className="text-xl font-bold mt-8 mb-2">Uses Of Alcohol</h2>
          <p className="text-[#969696]">
            Wine is an alcoholic beverage fermented from grapes. The natural
            chemical balance allows grapes to ferment without the need for added
            sugars, acids, enzymes, water or other nutrients. Yeast consumes the
            sugars in the grapes and converts them into alcohol and carbon
            dioxide. Different grape varieties and different yeast strains form
            different forms of wine.
          </p>
        </div>
        <img
          src="https://cdn.shopify.com/s/files/1/0587/7687/9243/files/2.jpg?v=1652685359"
          alt="Uses Of Alcohol"
          className="w-full md:w-1/2 h-auto  shadow-lg"
        />
      </div>
    </motion.div>
  );
}
