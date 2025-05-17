import { apiError400, apiError404, apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200, apiResponse201 } from "@/lib/apiResponse/success";
import {
  getAllTransactionCategories,
  createTransactionCategory,
  deleteTransactionCategory,
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError400();
    }

    const deleted = await deleteTransactionCategory(id);

    if (!deleted) {
      return apiError404();
    }

    return apiResponse200(deleted);
  } catch (err) {
    return apiError500(err);
  }
}
