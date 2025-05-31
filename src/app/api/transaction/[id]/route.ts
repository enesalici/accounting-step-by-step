import { apiError400, apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import Transaction from "@/models/Transaction";
import TransactionCategory from "@/models/TransactionCategory";
import { NextRequest } from "next/server";

// id from @@ params: id
// data from body
// title: string
// amount: number
// description: string
// categoryId: string
// userId: string
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const { title, amount, description, categoryId, userId } = data;


    await connectDB();

    await ensureExists(
      TransactionCategory.findById(categoryId),
      "Geçersiz kategori ID'si"
    );

    await ensureExists(Transaction.findById(id), "Transaction bulunamadı");

    const updated = await Transaction.findByIdAndUpdate(
      id,
      { title, amount, description, categoryId, userId },
      { new: true }
    );

    return apiResponse200(updated);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}
//______________________________________________________________________________________
// id from params
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) return apiError400("Geçersiz ID");

    await connectDB();

    await ensureExists(Transaction.findById(id), "Transaction bulunamadı");

    const deleted = await Transaction.findByIdAndDelete(id);

    return apiResponse200(deleted);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}
