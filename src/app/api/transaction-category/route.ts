import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200, apiResponse201 } from "@/lib/apiResponse/success";
import {
  getAllTransactionCategories,
  createTransactionCategory,
} from "@/services/transactionCategory/service";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const categories = await getAllTransactionCategories();
    return apiResponse200(categories);
  } catch (error) {
    return apiError500(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const created = await createTransactionCategory(data);

    return apiResponse201(created);
  } catch (err) {
    return apiError500(err);
  }
}


