import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { TbBrandPinterest } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 2xl:px-64 bg-[#171615] text-sm lg:px-16 xl:px-32 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-24">
        <div className="w-full md:w-/2 lg:w-1/4 flex flex-col gap-8">
          <div className="flex-1 flex items-center justify-center lg:w-1/3">
            <Link href={"/"}>
              <h1 className="text-2xl font-bold">VIBECART</h1>
            </Link>
          </div>
          <p>8569 Bond Rd, Elk Grove, California, 95624, United States.</p>
          <span className="font-semibold">contact@vibecart.com</span>
          <span className="font-semibold">+(916) 685-5555</span>
          <div className="flex gap-6">
            <FaFacebookF size={16} />
            <FaInstagram size={16} />
            <FaYoutube size={16} />
            <TbBrandPinterest size={16} />
            <FaXTwitter size={16} />
          </div>
        </div>
        <div className="lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href={""}>About Us</Link>
              <Link href={""}>Careers</Link>
              <Link href={""}>Affiliates</Link>
              <Link href={""}>Blog</Link>
              <Link href={""}>Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href={""}>New Arrivals</Link>
              <Link href={""}>Accessories</Link>
              <Link href={""}>Men</Link>
              <Link href={""}>Women</Link>
              <Link href={""}>All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href={""}>Customer Service</Link>
              <Link href={""}>My Account</Link>
              <Link href={""}>Find a Store</Link>
              <Link href={""}>Legal & Privacy</Link>
              <Link href={""}>Gift Card</Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, new
            arrivals, discounts and more!{" "}
          </p>
          <div className="flex">
            <input
              type="text"
              name=""
              id=""
              placeholder="Email Address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-black text-white">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2025 VIBECART</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium">United States | English</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">USD.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
