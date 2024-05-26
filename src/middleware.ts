"use server";
import NextAuth, { Session } from "next-auth";

import authConfig from "@/auth.config";
import {
  ApiAuthPrefix,
  AuthRoutes,
  DEFAULT_REDIRECT,
  PublicRoutes,
} from "@/routes";
import { NextAuthRequest } from "next-auth/lib";

const { auth } = NextAuth(authConfig);

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isLogin = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuthPrefix);
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null as any;
  }

  if (isAuthRoute) {
    if (isLogin) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLogin && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
