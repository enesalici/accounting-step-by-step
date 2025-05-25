import { NextRequest } from "next/server";
import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import InvoiceCategory from "@/models/InvoiceCategory";
import { connectDB } from "@/lib/data/mongoDb";
import TransactionCategory from "@/models/TransactionCategory";
import { ensureExists } from "@/lib/existing/ensureExists";
import { ensureNotExists } from "@/lib/existing/ensureNotExists";

export async function GET() {
  try {
    await connectDB();

    const categories = await InvoiceCategory.find();

    return apiResponse200(categories);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    await ensureNotExists(
      InvoiceCategory.findOne({ title: data.title }),
      "InvoiceCategory zaten mevcut"
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typeExists = await ensureExists<any>(
      TransactionCategory.findOne({ title: "faturalar" }),
      "İlgili kategori bulunamadı"
    );

    const newCategory = new InvoiceCategory({
      ...data,
      typeId: typeExists!._id,
    });

    const created = await newCategory.save();

    return apiResponse200(created);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}
