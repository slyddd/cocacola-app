"use server";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  error: string | undefined;
}

export async function handleLogin({ email, password }: LoginProps) {
  let res: LoginResponse | null = {
    ok: false,
    error: undefined,
  };

  try {
    res = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });
  } catch (error: any) {
    if (isRedirectError(error)) throw error;
    if (error instanceof AuthError) {
      console.log(error);
      res = {
        ok: false,
        error: error.cause?.err?.message || error.message,
      };
    } else {
      console.log(error);
      res = null;
    }
  }

  return res;
}
