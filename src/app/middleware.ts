import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Giriş yapılmamışsa cookie olmayacak
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  // Login sayfasına izin ver
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Diğer sayfalara erişim kontrolü
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Hangi sayfalar için çalışsın
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
