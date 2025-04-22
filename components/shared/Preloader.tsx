"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.img
            src="https://puffsnmore.com/wp-content/uploads/2025/02/2.png"
            alt="Logo"
            initial={{ opacity: 0 }} // ensure image is hidden at the start
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            onAnimationComplete={() => setLoading(false)}
            className="w-48 h-48" // increased logo size
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
