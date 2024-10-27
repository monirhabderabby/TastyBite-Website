import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPrivateRoute = createRouteMatcher(["/profile"]);

export default clerkMiddleware(async (auth, request) => {
  if (isPrivateRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  mather: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.*\\..*|_next).*)",
    "/",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
