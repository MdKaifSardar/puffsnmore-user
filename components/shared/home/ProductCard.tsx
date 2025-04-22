"use client"
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  slug: string;
  prices: any[];
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  isBestseller: boolean;
  isSale: boolean;
}

const Card = ({ product, shop }: { product: Product; shop?: boolean }) => {
  return (
    <div
      className="w-full flex-shrink-0 mb-2 group justify-center bg-gray-200 text-black p-4 rounded-lg shadow-md"
      key={product.slug}
    >
      <div className="relative overflow-hidden bg-gray-200 rounded-lg">
        <Link href={`/product/${product.slug}?style=0`}>
          <img
            src={product.image}
            // src="https://res.cloudinary.com/dvmbuktx3/image/upload/v1739460246/e2xaatnrkjk0nd92p7oc.png"
            alt={product.name}
            className="w-full h-auto object-cover mb-4 transition-transform duration-700 ease-in-out transform group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-2 left-2 flex gap-2">
          {product.isBestseller && (
            <span className="bg-[#E1B87F] text-white text-xs font-semibold px-2 py-1 rounded">
              BESTSELLER
            </span>
          )}
          {product.isSale && (
            <span className="bg-[#7EBFAE] text-white text-xs font-semibold px-2 py-1 rounded">
              SALE
            </span>
          )}
        </div>
        {typeof product?.discount !== "undefined" && product?.discount > 0 && (
          <span className="absolute bottom-2 left-2 bg-[#7EBFAE] text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
      </div>
      {shop ? null : (
        <div className="text-xs text-gray-600 mb-1 textGap text-[10px]">
          {product.category.length > 25
            ? product.category.substring(0, 25) + "..."
            : product.category}
        </div>
      )}

      <h3 className="font-semibold text-[13px] sm:text-sm mb-2 sm:textGap">
        {product.name.length > 20
          ? product.name.substring(0, 20) + "..."
          : product.name}
      </h3>
      <div className="flex items-center mb-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold ml-1">{product.rating}</span>
        <span className="text-xs text-gray-600 ml-2">
          ({product.reviews} Reviews)
        </span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold text-[13px] sm:text-sm">
          {product.prices.length === 1
            ? `₹${
                product.prices[0] - (product.prices[0] * product.discount) / 100
              }`
            : `From ₹${
                product.prices[0] - (product.prices[0] * product.discount) / 100
              } to ₹${
                product.prices[product.prices.length - 1] -
                (product.prices[product.prices.length - 1] * product.discount) /
                  100
              }`}
        </span>
        {/* <span className="text-gray-500 line-through text-sm">
          ₹{product.originalPrice.toFixed(2)}
        </span> */}
      </div>
      {!shop && (
        <Link
          className="w-full flex flex-row justify-center items-center"
          href={`/product/${product.slug}?style=0`}
        >
          <Button className="w-full sm:w-auto px-8">Learn More</Button>
        </Link>
      )}
    </div>
  );
};

const ProductCard = ({
  heading,
  shop,
  products,
}: {
  heading: string;
  shop?: boolean;
  products: any[];
}) => {
  return products.length > 0 ? (
    <div className="ownContainer mx-auto pb-[2rem] mb-[20px]">
      <div className="flex justify-center">
        <div className="py-[2rem] heading ownContainer uppercase sm:my-[40px]">
          {heading}
        </div>
      </div>
      <div className="relative">
        <div
          className={`${
            shop
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex overflow-x-auto gap-4 sm:gap-6 scroll-smooth no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4"
          } mb-8 `}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: false }}  // repeat animation every time in view
            >
              <Card product={product} shop={shop} />
            </motion.div>
          ))}
        </div>
      </div>
      {!shop && (
        <div className="flex justify-center mt-8">
          <Button
            variant={"outline"}
            className="w-[90%] sm:w-[347px] border-2 border-black text-black px-[10px] py-[20px]"
          >
            VIEW ALL
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-4">No Products Found</h1>
      <Link href={"/shop"}>
        <Button className="p-2">Go to Shop Page</Button>
      </Link>
    </div>
  );
};

export default ProductCard;
