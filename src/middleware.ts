import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
	const isLoggedIn = !!req.auth?.user;
	const authRoutes = ["/profile"];

	const isProtected = authRoutes.some((route) =>
		req.nextUrl.pathname.startsWith(route)
	);

	if (isProtected && !isLoggedIn) {
		return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
	}

	const adminRoutes = ["/admin"];

	const isAdminProtected = adminRoutes.some((route) =>
		req.nextUrl.pathname.startsWith(route)
	);

	const isAdmin = req.auth?.user.role == "ADMIN";

	if (isAdminProtected && !isAdmin) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL("/profile", req.nextUrl.origin));
		} else {
			return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
		}
	}
});

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
