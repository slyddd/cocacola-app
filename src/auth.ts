import NextAuth from "next-auth";
import { prisma } from "@/libs/prisma";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import axios from "axios";
import { AdminInterface } from "@/interfaces/adminInterface";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const { data: admin } = await axios.get<AdminInterface>(
        process.env.API_URL + "/admin/" + token.sub,
      );
      if (!admin) return token;

      token.user = { ...admin, password: undefined };
      return token;
    },
    async session({ token, session }) {
      if (!token.user) return session;
      session.user = token.user as any;

      return session;
    },
  },
});
