import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

const secret = process.env.AUTH_SECRET;

const roleBasedRoutes: Record<string, UserRole> = {
  "/student": "STUDENT",
  "/doctor": "DOCTOR",
  "/admin": "ADMIN",
};

import { publicRoutes } from "./routes";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret, salt: undefined });
  const isLoggedIn = !!token;
  const userRole = token?.role as UserRole;
  const isPublicRoute = publicRoutes.includes(pathname);
  return NextResponse.next();

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && roleBasedRoutes[`/${pathname.split("/")[1]}`]) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (!isLoggedIn) {
    return NextResponse.next();
  }

  const routePrefix = pathname.split("/")[1];
  const expectedRole = roleBasedRoutes[`/${routePrefix}`];

  if (!expectedRole) {
    return NextResponse.next();
  }

  if (userRole !== expectedRole) {
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(student|doctor|admin)(/.*)?",
    "/((?!.*\\..*|_next|api/auth).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};