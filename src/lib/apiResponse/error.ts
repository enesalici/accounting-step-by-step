import { NextResponse } from "next/server";

//invalid req
export function apiError400(message: string) {
  return NextResponse.json(
    {
      status: 400,
      success: false,
      message,
    },
    { status: 400 }
  );
}

//notFound req
export function apiError404(message: string) {
  return NextResponse.json(
    {
      status: 404,
      success: false,
      message,
    },
    { status: 404 }
  );
}
//unAuthorization req
export function apiError401() {
  return NextResponse.json(
    {
      status: 401,
      success: false,
      message: "unAuthorization",
    },
    { status: 401 }
  );
}
//server error
export function apiError500(details: unknown) {
  return NextResponse.json(
    {
      status: 500,
      success: false,
      message: "Sunucu hatası",
      details,
    },
    { status: 500 }
  );
}
