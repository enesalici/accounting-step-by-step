import TransactionType from "@/models/TransactionType";
import { connectDB } from "@/lib/data/mongoDb";
import { ApiError } from "@/lib/errors/ApiError";

export async function getAllTransactionTypes() {
  try {
    await connectDB();
    return await TransactionType.find();
  } catch (error) {
    throw new ApiError(
      500,
      "TransactionType verileri alınamadı: " + (error as Error).message
    );
  }
}
