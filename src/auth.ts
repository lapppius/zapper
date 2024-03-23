// NextAuth initialization 
import NextAuth from "next-auth";
// auth.config configure providers and options 
import { authConfig } from "./auth.config";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth(authConfig);
