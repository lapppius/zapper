import type { NextAuthConfig } from "next-auth";
import { type InferSelectModel } from "drizzle-orm";
import Google from "next-auth/providers/google";
import db from "@/app/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { users, sessions } from "@/app/lib/schema/users";
import { eq } from "drizzle-orm";

declare module "@auth/core/adapters" {
  // eslint-disable-next-line no-unused-vars
  interface AdapterUser extends InferSelectModel<typeof users> {
    // ...other properties
    role: string;
  }
}

export const authConfig = {
  //workaround to get  users schema define attributes in session until is fixed in the DrizzleAdapter
  adapter: {
    ...DrizzleAdapter(db),
    async getSessionAndUser(data) {
      const sessionAndUsers = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId));

      return sessionAndUsers[0] ?? null;
    },
  },

  pages: {
    // custom login route
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
  session: {
    maxAge: 1 * 24 * 60 * 60, // 1 day in seconds
  },
  trustHost: true,
} satisfies NextAuthConfig;
