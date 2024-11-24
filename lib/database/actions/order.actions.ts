"use server";

import { connectToDatabase } from "../connect";
import Order from "../models/order.model";
import User from "../models/user.model";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import EmailTemplate from "@/lib/emails/index";
import { handleError } from "@/lib/utils";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
const { ObjectId } = mongoose.Types;
// create an order
export async function createOrder(
  products: any[],
  shippingAddress: any,
  paymentMethod: string,
  total: number,
  totalBeforeDiscount: number,
  couponApplied: string,
  userId: string,
  totalSaved: number
) {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return {
        message: "User not found with provided ID!",
        success: false,
        orderId: null,
      };
    }
    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
      totalSaved,
    }).save();
    let config = {
      service: "gmail",
      auth: {
        user: "raghunadhwinwin@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD as string,
      },
    };
    let transporter = nodemailer.createTransport(config);
    let dataConfig = {
      from: config.auth.user,
      to: user.email,
      subject: "Order Confirmation - VibeCart",
      html: await render(EmailTemplate(newOrder)),
    };
    await transporter.sendMail(dataConfig).then(() => {
      return {
        message: "You Should revieve an email",
        orderId: JSON.parse(JSON.stringify(newOrder._id)),
        success: true,
      };
    });
    return {
      message: "Successfully placed Order.",
      orderId: JSON.parse(JSON.stringify(newOrder._id)),
      success: true,
    };
  } catch (error) {
    handleError(error);
  }
}

// get order details by its ID
export async function getOrderDetailsById(orderId: string) {
  try {
    if (!ObjectId.isValid(orderId)) {
      redirect("/");
    }
    await connectToDatabase();
    const orderData = await Order.findById(orderId)
      .populate({ path: "user", model: User })
      .lean();
    if (!orderData) {
      return {
        message: "Order not found with this ID!",
        success: false,
        orderData: [],
      };
    } else {
      return {
        message: "Successfully grabbed data.",
        success: true,
        orderData: JSON.parse(JSON.stringify(orderData)),
      };
    }
  } catch (error) {
    handleError(error);
  }
}
