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
    async session({ token, session }) {
      if (token.sub && session.user) session.user.id = token.sub;

      const { data: admin } = await axios.get<AdminInterface>(
        process.env.API_URL + "/admin/" + token.sub,
      );

      if (!admin) return session;
      if (token.user) session.user = { ...session.user, ...admin };
      return session;
    },
  },
});
