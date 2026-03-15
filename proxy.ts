import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    /*
      Protect everything except:
      - login
      - signup
      - nextauth
      - public files
    */
    "/((?!login|signup|api/auth|api/signup|_next/static|_next/image|favicon.ico).*)",
  ],
};
