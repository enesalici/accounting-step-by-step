
import { apiError404 } from "@/lib/apiResponse/error";



export async function ensureExists<T>(
  promise: Promise<T | null>,
  notFoundMessage: string = "Bulunamadı"
): Promise<T> {
  const result = await promise;
  if (!result) {
    throw apiError404(notFoundMessage);
  }
  return result;
}