import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { createFakeData } from "@/scripts/createMainData/createMainData";

export async function GET() {
  try {
    await createFakeData();
    return apiResponse200(null);
  } catch (err) {
    console.error("Seed error:", err);
    return apiError500(err);
  }
}
