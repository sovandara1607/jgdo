import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Site-wide maintenance switch. Flip MAINTENANCE_MODE=true in the deploy
 * environment (no redeploy needed) and every page rewrites to /maintenance
 * — the URL in the browser doesn't change, so links people already have
 * still "work," they just see the maintenance screen.
 *
 * API routes stay excluded: PayWay/CutLuy webhooks must keep landing even
 * while the storefront itself is down, or a payment confirmation gets
 * silently dropped.
 */
export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/maintenance", request.url));
}

export const config = {
  matcher: [
    "/((?!maintenance|api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image).*)",
  ],
};
