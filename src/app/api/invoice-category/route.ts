import { NextRequest } from "next/server";
import { apiError500 } from "@/lib/apiResponse/error";
import { createInvoiceCategory, getAllInvoiceCategories } from "@/services/invoiceCategory/service";
import { apiResponse200 } from "@/lib/apiResponse/success";



export async function GET() {
    try {
        const categories = await getAllInvoiceCategories();
        return apiResponse200(categories);
    } catch (error) {
        return apiError500(error);
    }
}


export async function POST (request: NextRequest){
    try {
        const data = await request.json();
        const created = await createInvoiceCategory(data);
        return apiResponse200(created)
    } catch (error) {
        return apiError500(error)
    }
}


