import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// List of routes that don’t need authentication
const PUBLIC_PATHS = ["/api/login", "/api/web"];

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip public routes
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Only protect API routes
  if (pathname.startsWith("/api")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // apply only to API routes
};
