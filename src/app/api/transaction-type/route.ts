import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { getAllTransactionTypes } from "@/services/transactionType/service";

export async function GET() {
  try {
    const types = await getAllTransactionTypes();
    return apiResponse200(types);
  } catch (error) {
    return apiError500(error);
  }
}
