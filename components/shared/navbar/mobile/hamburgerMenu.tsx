"use client";
import { useAtom, useStore } from "jotai";
import React from "react";
import { hamburgerMenuState } from "../store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, Package, Truck, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const MobileHamBurgerMenu = ({
  navItems,
}: {
  navItems: { name: string; icon: any; hasSubmenu?: boolean; link: string }[];
}) => {
  const [hamMenuOpen, setHamMenuOpen] = useAtom(hamburgerMenuState, {
    store: useStore(),
  });
  const handleOnClickHamurgerMenu = () => {
    setHamMenuOpen(true);
  };

  // New function to handle scroll to anchor links
  const handleNavItemClick = (link: string) => {
    setHamMenuOpen(false);
    const hashIndex = link.indexOf("#");
    if (hashIndex !== -1) {
      const elementId = link.substring(hashIndex + 1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Sheet open={hamMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          onClick={() => handleOnClickHamurgerMenu()}
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] overflow-y-auto"
      >
        <div className="flex items-center space-x-4 mb-2">
          <User size={40} className=" border-2 border-black p-1 rounded-full" />
        </div>
        <div className="mb-6">
          <Link href="/track-order" onClick={() => setHamMenuOpen(false)}>
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full text-sm py-1 bg-[#E4E4E4] rounded"
            >
              TRACK ORDER
            </motion.button>
          </Link>
        </div>
        <div className="space-y-4">
          {navItems
            .filter((item) =>
              [
                "CRAZY DEALS",
                "SHOP ALL",
                "BESTSELLERS",
                "SPECIAL COMBOS",
                "FEATURED PRODUCTS",
                "NEW ARRIVALS",
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileHamBurgerMenu;
