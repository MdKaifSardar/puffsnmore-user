"use client";
import React from "react";
import { Menu, ChevronRight, User, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom, useStore } from "jotai";
import { hamburgerMenuState } from "../store";

const MobileHamBurgerMenu = ({
  navItems,
}: {
  navItems: { name: string; icon: any; hasSubmenu?: boolean; link: string }[];
}) => {
  const [hamMenuOpen, setHamMenuOpen] = useAtom(hamburgerMenuState, { store: useStore() });

  const handleNavItemClick = (link: string) => {
    const hashIndex = link.indexOf("#");
    if (hashIndex !== -1) {
      const elementId = link.substring(hashIndex + 1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setHamMenuOpen(false);
  };

  // Framer Motion variants for sliding in/out
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const slideVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3 } },
    exit: { x: "-100%", transition: { duration: 0.3 } },
  };

  return (
    <>
      <button className="lg:hidden mr-2" onClick={() => setHamMenuOpen(true)}>
        <Menu size={24} />
      </button>
      <AnimatePresence>
        {hamMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="w-[300px] sm:w-[400px] bg-white overflow-y-auto relative"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close cross at top right */}
              <button
                onClick={() => setHamMenuOpen(false)}
                className="absolute top-4 right-4 z-10"
              >
                <X size={24} />
              </button>
              <div className="flex items-center space-x-4 mb-2 p-4">
                <User size={40} className="border-2 border-black p-1 rounded-full" />
              </div>
              <div className="mb-6 px-4">
                <Link
                  href="/track-order"
                  onClick={() => setHamMenuOpen(false)}
                  className="block w-full text-sm py-1 bg-[#E4E4E4] rounded text-center"
                >
                  TRACK ORDER
                </Link>
              </div>
              <div className="space-y-4 px-4">
                {navItems
                  .filter((item) =>
                    [
                      "CRAZY DEALS",
                      "SHOP ALL",
                      "BESTSELLERS",
                      "SPECIAL COMBOS",
                      "NEW ARRIVALS",
                      "FEATURED PRODUCTS",
                    ].includes(item.name)
                  )
                  .map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      onClick={() => handleNavItemClick(item.link)}
                      className="flex items-center justify-between py-2 border-b border-b-gray-300"
                    >
                      <div className="flex items-center space-x-4">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {item.hasSubmenu && <ChevronRight size={20} />}
                    </Link>
                  ))}
              </div>
            </motion.div>
            <div className="flex-grow" onClick={() => setHamMenuOpen(false)}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHamBurgerMenu;

