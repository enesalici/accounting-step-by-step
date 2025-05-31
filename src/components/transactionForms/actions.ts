"use server";

import { revalidatePath } from "next/cache";

//add TRANSACTION
export async function addTransaction(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = Number(formData.get("amount"));
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const userId = formData.get("userId") as string;

  const res = await fetch("http://localhost:3000/api/transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount, description, categoryId, userId }),
  });

  const data = await res.json();

  revalidatePath("/dashboard");

  return data.details; // Burada sadece details dönüyoruz
}

export async function deleteTransaction(_id: string | null) {
  try {
    const res = await fetch(`http://localhost:3000/api/transaction/${_id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Silme işlemi başarısız oldu.");
    }
    revalidatePath("/dashboard");
    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Hata:", error);
    return { success: false, error: error.message };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateTransaction(_id: string, data: any) {
  const res = await fetch(`http://localhost:3000/api/transaction/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");

  return res.json();
}