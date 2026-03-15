import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Not logged in
    if (!token && pathname !== "/login" && pathname !== "/signup") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Onboarding check
    if (token && !token.onboardingCompleted && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: [
    "/((?!api/auth|api/onboarding|_next/static|_next/image|favicon.ico|login|signup).*)",
  ],
};
