import {  apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200, apiResponse201 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import { ensureNotExists } from "@/lib/existing/ensureNotExists";
import TransactionCategory from "@/models/TransactionCategory";
import TransactionType from "@/models/TransactionType";
import { NextRequest } from "next/server";

//req
export async function GET() {
  try {
    await connectDB();
    const categories = await ensureExists(
       TransactionCategory.find(),
      "Transaction Category verileri bulunamadı"
    )
    return apiResponse200(categories);
  } catch (error) {
    return apiError500(error);
  }
}

//______________________________________________________________________________________

// data from body @@
// title : string
// typeId : string
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await connectDB();

    await ensureExists(
      TransactionType.findById(data.typeId),
      "Geçersiz typeId: Transaction type bulunamadı"
    );

    await ensureNotExists(
      TransactionCategory.findOne({ title: data.title }),
      "TransactionCategory zaten mevcut"
    );

    const newCategory = new TransactionCategory(data);
    const saved = await newCategory.save();

    return apiResponse201(saved);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}


