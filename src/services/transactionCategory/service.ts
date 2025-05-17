import TransactionCategory from "@/models/TransactionCategory";
import TransactionType from "@/models/TransactionType";
import { connectDB } from "@/lib/data/mongoDb";
import { ApiError } from "@/lib/errors/ApiError";

export async function getAllTransactionCategories() {
  try {
    await connectDB();
    return await TransactionCategory.find();
  } catch (error) {
    throw new ApiError(500, "TransactionCategory verileri alınamadı: " + error);
  }
}

export async function createTransactionCategory(data: {
  title: string;
  typeId: string;
}) {
  try {
    await connectDB();

    const existing = await TransactionCategory.findOne({ title: data.title });
    if (existing) throw new ApiError(400, "TransactionCategory zaten mevcut");

    const typeExists = await TransactionType.findById(data.typeId);
    if (!typeExists)
      throw new ApiError(404, "Geçersiz typeId: TransactionType bulunamadı");

    const newCategory = new TransactionCategory(data);
    return await newCategory.save();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "TransactionCategory oluşturulamadı: " + error);
  }
}

export async function updateTransactionCategory(
  id: string,
  data: { title?: string; typeId?: string }
) {
  try {
    await connectDB();
    const updatedCategory = await TransactionCategory.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
    if (!updatedCategory)
      throw new ApiError(404, "TransactionCategory bulunamadı");
    return updatedCategory;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "TransactionCategory güncellenemedi: " + error);
  }
}

export async function deleteTransactionCategory(id: string) {
  try {
    await connectDB();
    const deleted = await TransactionCategory.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "TransactionCategory bulunamadı");
    return deleted;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, "TransactionCategory silinemedi: " + error);
  }
}
