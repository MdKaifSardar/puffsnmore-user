// ISR(CACHE) - 10 MINUTES

import ShopPageComponent from "@/components/shared/shop";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Shop All Products | VibeCart",
  description: "VibeCart - Shop all products ",
};
export const revalidate = 600;

const ShopPage = () => {
  return (
    <div>
      <ShopPageComponent />
    </div>
  );
};

export default ShopPage;
