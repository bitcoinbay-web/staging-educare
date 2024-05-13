// import { auth } from "@/auth";

// import { auth } from "@/auth";

import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // console.log("ROUTE:", req.nextUrl.pathname);
  // console.log("IS LOGGEDIN:", isLoggedIn);

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if (isApiAuthRoute) {
  //   return null;
  // }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return null;
  // }

  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL("/login", nextUrl));
  // }

  return null;
});

export const config = {
  unstable_allowDynamic: [
    // allows a single file
    // '/lib/utilities.js',
    // use a glob to allow anything in the function-bind 3rd party module
    '/node_modules/mongoose/**',
  ],
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
