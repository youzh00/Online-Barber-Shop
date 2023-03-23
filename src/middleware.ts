import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;

    // allow all users to proceed to /shops/[id]
    if (req.nextUrl.pathname.match(/shops\/.+/)) {
      return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith("/shops") && token?.role !== "BARBER") {
      return NextResponse.redirect(new URL("/home", req.url));
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
