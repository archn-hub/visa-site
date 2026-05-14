import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const retiredHosts = new Set(["visa-site-qeif.vercel.app"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (host && retiredHosts.has(host)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
