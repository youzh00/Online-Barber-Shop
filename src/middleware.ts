import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/home") && token?.role !== "BARBER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return Boolean(token?.email);
      },
    },
  }
);

export const config = { matcher: ["/home", "/settings", "/shops"] };
