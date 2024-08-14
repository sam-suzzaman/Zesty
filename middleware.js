import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
    const token = cookies(req).get("next-auth.session-token");
    const currentPathname = req.nextUrl.pathname;

    // if(currentPathname.includes("api")){}

    if (!token) {
        return NextResponse.redirect(
            new URL(`/auth?redirect=${currentPathname}`, req.url)
        );
        // return NextResponse.redirect(new URL(`/auth`, req.url));
    }

    return NextResponse.next();
};

export const config = {
    // martcher: ["/user/auth", "/resturant", "/resturant/:path*"],
    matcher: ["/cart", "/user/dashboard/profile"],
};
