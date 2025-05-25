import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import TransactionCategory from "@/models/TransactionCategory";
import TransactionType from "@/models/TransactionType";
import { NextRequest } from "next/server";


// id from params @@ params : id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const deleted = await ensureExists(
      TransactionCategory.findByIdAndDelete(id),
      "Silinecek kategori bulunamadı"
    )

    return apiResponse200(deleted);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}

//______________________________________________________________________________________


// id from params @@ params : id 
// data from body @@ data : title, typeId
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    await connectDB();

    if (data.typeId) {
      await ensureExists(
        TransactionType.findById(data.typeId),
        "Geçersiz typeId: TransactionType bulunamadı"
      );
    }

   const updated = await ensureExists(
     TransactionCategory.findByIdAndUpdate(id, data, {
       new: true,
     }),
     "Güncellenecek Transaction Category kategori bulunamadı"
   );

    return apiResponse200(updated);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}