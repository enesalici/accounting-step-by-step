// scripts/createFakeData.ts
import { connectDB, disconnectDB } from "@/lib/data/mongoDb";

import TransactionType from "@/models/TransactionType";
import TransactionCategory from "@/models/TransactionCategory";
import InvoiceTransaction from "@/models/InvoiceCategory";
import User from "@/models/User";
import Transaction from "@/models/Transaction";




export async function createFakeData() {
  await connectDB();

  try { 
    // 1. TransactionType
  const typesData = ["income", "expense"];
  const types = [];
  for (const title of typesData) {
    let t = await TransactionType.findOne({ title });
    if (!t) {
      t = new TransactionType({ title });
      await t.save();
      console.log(`TransactionType oluşturuldu: ${title}`);
    } else {
      console.log(`TransactionType zaten var: ${title}`);
    }
    types.push(t);
  }

  const expenseType = types.find((t) => t.title === "expense")!;

  // 2. TransactionCategory
  const categoriesData = [
    { title: "yemek", typeId: expenseType._id },
    { title: "kira", typeId: expenseType._id },
    { title: "internet", typeId: expenseType._id },
    { title: "faturalar", typeId: expenseType._id },
    { title: "Öğretmen maaş giderleri", typeId: expenseType._id },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    let c = await TransactionCategory.findOne({ title: cat.title });
    if (!c) {
      c = new TransactionCategory(cat);
      await c.save();
      console.log(`TransactionCategory oluşturuldu: ${cat.title}`);
    } else {
      console.log(`TransactionCategory zaten var: ${cat.title}`);
    }
    categories.push(c);
  }
  
  const faturalarCategory = categories.find((c) => c.title === "faturalar");
  // 3. InvoiceTransaction
  const invoiceData = [
    { title: "elektrik faturası", typeId: faturalarCategory?._id },
    { title: "su faturası", typeId: faturalarCategory?._id },
    { title: "doğalgaz faturası", typeId: faturalarCategory?._id },
    { title: "internet faturası", typeId: faturalarCategory?._id },
    { title: "telefon faturası", typeId: faturalarCategory?._id },
  ];

  for (const invoice of invoiceData) {
    let i = await InvoiceTransaction.findOne({ title: invoice.title });
    if (!i) {
      i = new InvoiceTransaction(invoice);
      await i.save();
      console.log(`InvoiceTransaction oluşturuldu: ${invoice.title}`);
    } else {
      console.log(`InvoiceTransaction zaten var: ${invoice.title}`);
    }
  }

  // 4. User
  let user = await User.findOne({ email: "enes@mail.com" });
  if (!user) {
    user = new User({
      firstname: "Enes",
      lastname: "Alıcı",
      email: "enes@mail.com",
      passwordHash: "123",
      passwordSalt: "123",
    });
    await user.save();
    console.log("User oluşturuldu.");
  } else {
    console.log("User zaten var.");
  }

  // 5. Transaction
  const sampleCategory = categories[0];
  let transaction = await Transaction.findOne({ amount: 100 });
  if (!transaction) {
    transaction = new Transaction({
      title: "Örnek Transaction",
      userId: user._id,
      categoryId: sampleCategory._id,
      amount: 100,
      date: new Date(),
    });
    await transaction.save();
    console.log("Transaction oluşturuldu.");
  } else {
    console.log("Transaction zaten var.");
  }
   }
  catch (error) {
    console.error("Hata:", error);
  
  } finally {
    await disconnectDB();
  }



  return {
    Transaction,
    InvoiceTransaction,
    TransactionCategory,
    User,
    TransactionType,
  };
}


