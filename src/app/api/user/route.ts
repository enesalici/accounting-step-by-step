import { apiError500 } from "@/lib/apiResponse/error";
import { apiResponse200 } from "@/lib/apiResponse/success";
import { connectDB } from "@/lib/data/mongoDb";
import { ensureExists } from "@/lib/existing/ensureExists";
import User from "@/models/User";


export async function GET(){
    try {
        await connectDB();
        const users = await ensureExists(
            User.find(),
            "User verileri bulunamadı"
        );
        return apiResponse200(users);
    } catch (error) {
        return apiError500(error)
    }
}