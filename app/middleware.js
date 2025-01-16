import { NextResponse } from "next/server";

export function middleware(req) {
    if (typeof window !== 'undefined') {
        const userId = localStorage.getItem('userId');
        const { pathname } = req.nextUrl;

        // Protect /ControlPannel/ routes
        if (pathname.startsWith("/ControlPannel") && !userId) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/ControlPannel/:path*"],
};
