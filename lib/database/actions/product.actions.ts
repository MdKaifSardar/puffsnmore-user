"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "../connect";
import Category from "../models/category.model";
import Product from "../models/product.model";
import SubCategory from "../models/subCategory.model";
import User from "../models/user.model";
import { redirect } from "next/navigation";

// get all products
export async function getAllProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    if (!products) {
      return {
        message: "Products are not yet created!",
        success: false,
      };
    }
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    handleError(error);
  }
}

// get all top selling products
export async function getTopSellingProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find()
      .sort({ "subProduct.sold": -1 })
      .lean();
    if (!products) {
      return {
        products: [],
        message: "Products are not yet created!",
        success: false,
      };
    }
    return {
      products: JSON.parse(JSON.stringify(products)),
      success: true,
      message: "Products fetched successully.",
    };
  } catch (error) {
    handleError(error);
  }
}

// get all new arrival products
export async function getNewArrivalProducts() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    if (!products) {
      return {
        message: "Products are not yet created!",
        success: false,
        products: [],
      };
    }
    return {
      message: "Fetched all new arrival products",
      success: true,
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (error) {
    handleError(error);
  }
}

// fetch products by query
export async function getProductsByQuery(query: string) {
  try {
    await connectToDatabase();
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    })
      .limit(4)
      .lean();
    if (!products || products.length === 0) {
      return {
        products: [],
        success: false,
        message: "No products found with this search criteria.",
      };
    }
    return {
      products: JSON.parse(JSON.stringify(products)),
      success: true,
      message: "Successfully fetched all query related products.",
    };
  } catch (error) {
    handleError(error);
  }
}

// get single product
export async function getSingleProduct(
  slug: string,
  style: number,
  size: number
) {
  try {
    await connectToDatabase();
    let product: any = await Product.findOne({ slug })
      .populate({
        path: "category",
        model: Category,
      })
      .populate({ path: "subCategories", model: SubCategory })
      .populate({ path: "review.reviewBy", model: User })
      .lean();
    let subProduct = product?.subProducts[style];
    let prices = subProduct.sizes
      .map((s: any) => {
        return s.price;
      })
      .sort((a: any, b: any) => {
        return a - b;
      });
    let newProduct = {
      ...product,
      style,
      images: subProduct.images,
      sizes: subProduct.sizes,
      discount: subProduct.discount,
      sku: subProduct.sku,
      colors: product.subProducts.map((p: any) => {
        return p.color;
      }),
      priceRange:
        prices.length > 1 &&
        `From ₹${prices[0]} to ₹${prices[prices.length - 1]}`,
      price:
        subProduct.discount > 0
          ? (
              subProduct.sizes[size].price -
              (subProduct.sizes[size].price * subProduct.discount) / 100
            ).toFixed(2)
          : subProduct.sizes[size].price,
      priceBefore: subProduct.sizes[size].price,
      quantity: subProduct.sizes[size].qty,
      allSizes: product.subProducts
        .map((p: any) => {
          return p.sizes;
        })
        .flat()
        .sort((a: any, b: any) => {
          return a.size - b.size;
        })
        .filter(
          (element: any, index: any, array: any) =>
            array.findIndex((el2: any) => el2.size === element.size) === index
        ),
    };
    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
    redirect("/");
  }
}

// create a product review for individual product
export async function createProductReview(
  rating: number,
  review: string,
  clerkId: string,
  productId: string
) {
  try {
    await connectToDatabase();
    const product = await Product.findById(productId);
    const user = await User.findOne({ clerkId });

    if (product) {
      const exist = product.reviews.find(
        (x: any) => x.reviewBy.toString() == user._id
      );
      if (exist) {
        await Product.updateOne(
          {
            _id: productId,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": review,
              "reviews.$.rating": rating,
            },
          },
          {
            new: true,
          }
        );
        const updatedProduct = await Product.findById(productId);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a: any, r: any) => r.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
        await updatedProduct.populate("reviews.reviewBy");
        return JSON.parse(
          JSON.stringify({ reviews: updatedProduct.reviews.reverse() })
        );
      } else {
        const full_review = {
          reviewBy: user._id,
          rating,
          review,
        };
        product.reviews.push(full_review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a: any, r: any) => r.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await product.populate("reviews.reviewBy");

        return JSON.parse(
          JSON.stringify({ reviews: product.reviews.reverse() })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// get related products by subCategory Ids.
export async function getRelatedProductsBySubCategoryIds(
  subCategoryIds: string[]
) {
  try {
    await connectToDatabase();
    const query = subCategoryIds.length
      ? {
          subCategories: { $in: subCategoryIds },
        }
      : {};
    let products = await Product.find({ ...query });
    return {
      success: true,
      products: JSON.parse(JSON.stringify(products)),
    };
  } catch (error) {
    handleError(error);
  }
}

// get featured products
export async function getAllFeaturedProducts() {
  try {
    await connectToDatabase();
    const featuredProducts = await Product.find({ featured: true }).populate({
      path: "category",
      model: Category,
    });
    return {
      featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
      success: true,
      message: "Successfully fetched all feautured products.",
    };
  } catch (error) {
    handleError(error);
  }
}
