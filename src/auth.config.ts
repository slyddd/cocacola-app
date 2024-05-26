import credentials from "next-auth/providers/credentials";
import axios, { Axios, AxiosError } from "axios";

import type { NextAuthConfig, User } from "next-auth";
import { LoginInterface } from "@/interfaces/loginInterface";

export default {
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, request): Promise<User | null> {
        if (!credentials) throw new Error("No credentials provided");
        try {
          const {
            data: { user, accessToken },
          } = await axios.post<LoginInterface>(
            process.env.API_URL + "/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
          } as any;
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.response?.data.error);
            throw new Error(error.response?.data.error || "An error occurred");
          }
          console.log(error);
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
