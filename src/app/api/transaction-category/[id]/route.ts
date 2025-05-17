import { apiError400, apiError404, apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import {
  deleteTransactionCategory,
} from "@/services/transactionCategory/service";
import { NextRequest } from "next/server";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req : NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

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

