import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";

export async function GET() {
  try {
    return apiResponse200(null);
  } catch (err) {
    console.error("Seed error:", err);
    return apiError500(err);
  }
}
