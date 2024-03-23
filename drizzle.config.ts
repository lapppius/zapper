/**
 * This file is used by drizzle-kit. Specifies the db schema path,
 * the migrations output path and the connection string.
 */

import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
	schema: "./src/app/lib/schema/*",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!,
		ssl: true,
	},
	verbose: true,
	//This command is used for drizzle-kit push commands and will always ask for your confirmation,
	// either to execute all statements needed to sync your schema with the database or not.
	strict: true,
} satisfies Config;
