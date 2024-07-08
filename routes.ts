/**
 *  Note: These routes are accesible by public ie. Logged out Users
 *  These routes dont require authentication
 */

export const publicRoutes = ["/", "/new-verification"];

/**
 *  Note: These routes are used for authentication.
 */

export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset",
  "/new-password",
];

/**
 *  Note: This is simply the prefix for API Authentication routes.
 *  Routes with these prefixes are used for API Authentication Purposes.
 */

export const apiAuthPrefix = "/api/auth";

/**
 *  Note: The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_REDIRECT = "/student/dashboard";
