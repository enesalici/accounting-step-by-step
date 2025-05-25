import { apiError400,   apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200, apiResponse201 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import Transaction from "@/models/Transaction";
import TransactionCategory from "@/models/TransactionCategory";
import User from "@/models/User";
import { NextRequest } from "next/server";

// data
//title
//amount
//description
//categoryId 6826377f0598354c99468a42
//userId 6826377f0598354c99468a69

export async function GET() {
  try {
    await connectDB();
    const transactions = await ensureExists(
      Transaction.find(),
      "Transaction verileri alınamadı"
    );
    return apiResponse200(transactions);
  } catch (error) {
    return apiError500(error);
  }
}
//______________________________________________________________________________________

// data from body @@ params : id
// title: string
// amount: number
// description: string
// categoryId: string
// userId: string
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { title, amount, categoryId, description, userId } = data;

    // Zorunlu alanlar kontrolü
    if (!title?.trim() || !amount || !categoryId || !userId) {
      return apiError400("Zorunlu alanlar eksik");
    }

    await connectDB();

    await ensureExists(User.findById(userId), "Geçersiz kullanıcı ID'si");

    await ensureExists(
      TransactionCategory.findById(categoryId),
      "Geçersiz kategori ID'si"
    );

    const newTransaction = new Transaction({
      title,
      amount,
      categoryId,
      description,
      userId,
    });

    const created = await newTransaction.save();

    return apiResponse201(created);
  } catch (error) {
    return apiError500(error);
  }
}



// {
//   "title": "1",
//   "amount": 0,
//   "description": "1",
//   "categoryId": "6826377f0598354c99468a3f",
//   "userId": "6826377f0598354c99468a69"
// }