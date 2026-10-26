import { NextResponse } from "next/server";

const KEY = /^[a-zA-Z0-9-]{8,128}$/;

export function middleware(request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !KEY.test(key)) return NextResponse.next();
  if (request.nextUrl.pathname === `/${key}.txt`) {
    return new NextResponse(key, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: "/:file.txt" };
