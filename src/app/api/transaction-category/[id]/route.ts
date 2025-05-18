import { apiError400, apiError404, apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import {
  deleteTransactionCategory,
  updateTransactionCategory,
} from "@/services/transactionCategory/service";
import { NextRequest } from "next/server";


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    if (!id) return apiError400();
    if (!data || Object.keys(data).length === 0) return apiError400();

    const updated = await updateTransactionCategory(id, data);

    if (!updated) return apiError404();

    return apiResponse200(updated);
  } catch (err) {
    return apiError500(err);
  }
}