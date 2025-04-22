import React from "react";
import { Rabbit, Droplet, Wallet, Users } from "lucide-react";
const NeedOfWebsite = () => {
  const features = [
    {
      icon: Rabbit,
      title: "FAST DELIVERY",
      description: "Get your vape products delivered quickly and efficiently.",
    },
    {
      icon: Droplet,
      title: "QUALITY E-LIQUIDS",
      description: "Premium e-liquids crafted for a smooth vaping experience.",
    },
    {
      icon: Wallet,
      title: "BUDGET-FRIENDLY",
      description: "Affordable vape products without compromising on quality.",
    },
    {
      icon: Users,
      title: "COMMUNITY TRUSTED",
      description: "Join a community of satisfied vapers who trust our products.",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-[3rem] ">
      <h2 className="heading text-center mb-[40px] text-black">WHY PUFFSNMORE</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center text-black">
            <img
              src={`/images/features/${index + 1}.png`}
              alt="_"
              className="w-[2rem] h-[2rem] sm:w-[50px] sm:h-[50px] mb-[20px]" // modified for mobile devices to be 1rem
            />
            <h3 className="text-sm sm:text-lg mb-1 sm:mb-2 textGap">
              {feature.title}
            </h3>
            <p className="text-xs sm:text-sm textGap">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedOfWebsite;
