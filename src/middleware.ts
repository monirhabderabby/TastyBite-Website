import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, request) => {});

export const config = {
  mather: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.*\\..*|_next).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
