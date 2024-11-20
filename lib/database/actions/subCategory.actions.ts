"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "../connect";
import SubCategory from "../models/subCategory.model";

// get all sub categories by its parent(category) id
export async function getAllSubCategoriesByParentId(parentId: string) {
  try {
    await connectToDatabase();
    const subCategoriesByParentId = await SubCategory.find({
      parent: parentId,
    }).lean();
    return {
      message:
        "Successfully fetched all sub categories related to it's parent ID",
      subCategories: JSON.parse(JSON.stringify(subCategoriesByParentId)),
      success: true,
    };
  } catch (error) {
    handleError(error);
  }
}
