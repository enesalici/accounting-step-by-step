//id
//tittle
//type id from transaction id !!! this is static id 6826377f0598354c99468a51

import InvoiceCategory from "@/models/InvoiceCategory";

import { connectDB } from "@/lib/data/mongoDb";
import { ApiError } from "@/lib/errors/ApiError";
import TransactionCategory from "@/models/TransactionCategory";

export async function getAllInvoiceCategories() {
  try {
    await connectDB();
    return await InvoiceCategory.find();
  } catch (error) {
    throw new ApiError(500, "InvoiceCategory verileri alınamadı: " + error);
  }
}

export async function createInvoiceCategory(data: { title: string }) {
  try {
    await connectDB();

    const existing = await InvoiceCategory.findOne({ title: data.title });
    if (existing) throw new ApiError(400, "InvoiceCategory zaten mevcut");

    const typeExists = await TransactionCategory.findOne({
      title: "faturalar",
    });
    if (!typeExists) throw new ApiError(404, "İlgili kategori bulunamadı");

    const newCategory = new InvoiceCategory({
      ...data,
      typeId: typeExists._id,
    });

    return await newCategory.save();
  } catch (error) {
    throw new ApiError(500, "InvoiceCategory oluşturulamadı: " + error);
  }
}

export async function updateInvoiceCategory(id: string, data: { title: string }) {
  try {
    await connectDB();
    const updatedCategory = await InvoiceCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedCategory) throw new ApiError(404, "InvoiceCategory bulunamadı");

    return updatedCategory;
  } catch (error) {
    throw new ApiError(500, "InvoiceCategory silinemedi: " + error);
  }
}



export async function deleteInvoiceCategory(id: string) {
    try {
        await connectDB();
        const deleted = await InvoiceCategory.findByIdAndDelete(id);
        if (!deleted) throw new ApiError(404, "InvoiceCategory bulunamadı");
        return deleted;

    } catch (error) {
        throw new ApiError(500,"InvoiceCategory silinemedi: " + error );

    }
}