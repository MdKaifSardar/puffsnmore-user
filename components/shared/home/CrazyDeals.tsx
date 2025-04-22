"use client"
import React from "react";
import { motion } from "framer-motion";

type CrazyDealsDataType = {
  offers: any[];
  message: string;
  success: boolean;
};

const CrazyDeals = ({ dealsData }: { dealsData: CrazyDealsDataType }) => {
  return (
    <div className="w-full h-fit mx-auto px-4 py-[3rem] mb-[20px] bg-gray-100 rounded-lg">
      <div className="heading mb-[10px] ownContainer text-center uppercase sm:mb-[40px]">
        Crazy Deals
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-[20px] sm:justify-center scroll-smooth no-scrollbar">
          {dealsData.offers.map((deal, index) => (
            <motion.div
              key={deal._id}
              className="flex-shrink-0 w-[80vw] sm:w-[347px] overflow-hidden"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              viewport={{ once: false }}  // repeat animation each time in view
            >
              <img
                src={deal.images[0].url}
                alt={deal.title}
                className="w-full h-[200px] object-cover"
              />
              <p className="text-center uppercase textGap font-[500] mt-2">
                {deal.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrazyDeals;
