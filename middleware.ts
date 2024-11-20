import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const requireAuth = [
  "/dashboard",
  "/myownedworks",
  "/register-new-work",
  "/brand-guidelines",
  "/create-contract-offers",
  "/licensedwork",
  "/search-results",
  "/royalty",
  "/generate",
  "/settings",
];
const publicAuth = ["/auth"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (requireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } else if (publicAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
