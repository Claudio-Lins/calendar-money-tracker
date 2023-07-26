import { NextResponse } from "next/server";

export function middleware(request: {
  url(url: any): unknown;
  method(method: any): unknown;
  headers: { get: (arg0: string) => any };
}) {
  const orign = request.headers.get("orign");

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", orign || "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  console.log("Middlewares");
  console.log(request.method);
  console.log(request.headers.get("orign"));
  console.log(request.url);

  return response;
}
export const config = {
  matcher: "/api/:path*",
};
