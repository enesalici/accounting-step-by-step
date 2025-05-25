import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import TransactionType from "@/models/TransactionType";


export async function GET() {
  try {
    await connectDB();
    const types = await ensureExists(
      TransactionType.find(),
      "Transaction Type verileri bulunamadı"
    );
    return apiResponse200(types);
  } catch (error) {
    return apiError500(error);
  }
}
