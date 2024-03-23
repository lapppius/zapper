import { PgEnum } from "drizzle-orm/pg-core";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		id: string;
		role: PgEnum;
	}

	interface User {
		id: string;
		role: PgEnum;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
		role: PgEnum;
	}
}
