import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

// In this version of Next.js, middleware is called "Proxy" (proxy.ts).
// We do a fast, optimistic cookie-presence check here and redirect
// unauthenticated visitors away from the dashboard. The real session
// verification happens in the admin layout (close to the data).
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get(COOKIE_NAME)?.value);

  const isLoginPage = pathname === "/admin/login";
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");

  // Block the dashboard when there's no session cookie.
  if (isAdminArea && !isLoginPage && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // If already signed in, skip the login page.
  if (isLoginPage && hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
