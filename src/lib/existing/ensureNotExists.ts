import { apiError400 } from "../apiResponse/error";



export async function ensureNotExists<T>(
  promise: Promise<T | null>,
  existsMessage: string = "Zaten mevcut"
): Promise<void> {
  const result = await promise;
  if (result) {
    throw apiError400(existsMessage);
  }
}