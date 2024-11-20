"use  server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "../connect";
import HomeScreenOffer from "../models/home.screen.offers";

// Get all offers for home screen
export async function getAllSpecialComboOffers() {
  try {
    await connectToDatabase();
    const offers = await HomeScreenOffer.find({
      offerType: "specialCombo",
    }).sort({ updatedAt: -1 });
    return {
      offers: JSON.parse(JSON.stringify(offers)),
      message: "Successfully fetched specialCombo offers.",
      success: true,
    };
  } catch (error) {
    handleError(error);
  }
}

// Get all offers for home screen
export async function getAllCrazyDealOffers() {
  try {
    await connectToDatabase();
    const offers = await HomeScreenOffer.find({
      offerType: "crazyDeal",
    }).sort({ updatedAt: -1 });
    return {
      offers: JSON.parse(JSON.stringify(offers)),
      message: "Successfully fetched crazyDeal offers.",
      success: true,
    };
  } catch (error) {
    handleError(error);
  }
}
