"use client"
import React from "react";
import { motion } from "framer-motion";

type SpecialComboDataType = {
  offers: any[];
  message: string;
  success: boolean;
};
const SpecialCombos = ({ comboData }: { comboData: SpecialComboDataType }) => {
  return (
    <div className="container pb-[1rem] mx-auto px-4 mb-[20px]">
      <div className="heading my-[10px] ownContainer text-center uppercase sm:my-[40px]">
        SPECIAL COMBOS
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-[20px] sm:justify-center scroll-smooth no-scrollbar">
          {comboData.offers.map((combo, index) => (
            <motion.div
              key={combo._id}
              className="flex-shrink-0 w-[80vw] sm:w-[347px] h-[250px] overflow-hidden"
              initial={{ opacity: 0, y: -50 }} // translate from top animation
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              viewport={{ once: false }}  // animation repeats on each view
            >
              <img
                src={combo.images[0].url}
                alt={combo.title}
                className="w-full h-[200px] object-cover"
              />
              <p className="text-center uppercase textGap font-[500] mt-2">
                {combo.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialCombos;
