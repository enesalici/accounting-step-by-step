import { NextResponse } from "next/server";

export function apiResponse200(data: unknown) {
  return NextResponse.json(
    {
      status: 200,
      success: true,
      message: "İşlem başarılı",
      details: data,
    },
    { status: 200 }
  );
}

export function apiResponse201(data: unknown) {
  return NextResponse.json(
    {
      status: 201,
      success: true,
      message: "Kaynak başarıyla oluşturuldu",
      details: data,
    },
    { status: 201 }
  );
}