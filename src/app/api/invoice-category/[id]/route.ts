import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import { ensureNotExists } from "@/lib/existing/ensureNotExists";
import InvoiceCategory from "@/models/InvoiceCategory";
import { NextRequest } from "next/server";

// params id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    await ensureExists(
      InvoiceCategory.findById(id),
      "InvoiceCategory bulunamadı"
    );

    const deleted = await ensureExists(
      InvoiceCategory.findByIdAndDelete(id),
      "Silinecek kategori bulunamadı"
    );

    return apiResponse200(deleted);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}

//data
// title: string
// typeId: string (auto)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    await connectDB();

    await ensureExists(
      InvoiceCategory.findById(id),
      "InvoiceCategory bulunamadı"
    );

    await ensureNotExists(
      InvoiceCategory.findOne({ title: data.title, _id: { $ne: id } }),
      "InvoiceCategory zaten mevcut"
    );

    const updated = await ensureExists(
      InvoiceCategory.findByIdAndUpdate(id, data, {
        new: true,
      }),
      "Güncelleme başarısız"
    );

    return apiResponse200(updated);
  } catch (err) {
    if (err instanceof Response) return err;
    return apiError500(err);
  }
}
