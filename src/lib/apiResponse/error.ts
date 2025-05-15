import { NextResponse } from "next/server";

export function apiError400() {
  return NextResponse.json(
    {
      status: 400,
      success: false,
      message: "invalid request",
    },
    { status: 400 }
  );
}

export function apiError404() {
  return NextResponse.json(
    {
      status: 404,
      success: false,
      message: "Not Found",
    },
    { status: 404 }
  );
}

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
  


export function apiError403() {
  return NextResponse.json(
    {
      status: 403,
      success: false,
      message: "Access denied",
    },
    { status: 403 }
  );
}



export function apiError500(data: unknown) {
  return NextResponse.json(
    {
      status: 500,
      success: false,
      message: "User error :)",
      details: data,
    },
    { status: 500 }
  );
}