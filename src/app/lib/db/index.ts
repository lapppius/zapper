/**
 * Establishes a connection to the Neon Postgres serverless
 * database and initialize Drizzle ORM
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

//The non-null assertion operator "!" is a concise way of
//  avoiding unnecessary null and undefined checks in our code
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export default db;
