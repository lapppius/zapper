import { relations } from "drizzle-orm";
import { varchar, numeric, pgTable } from "drizzle-orm/pg-core";
import { organization } from "./organization";
import { radios } from "./radios";

export const country = pgTable("country", {
	numeric: numeric("numeric").primaryKey().notNull(),
	enName: varchar("en_name", { length: 200 }).notNull(),
	alpha2Code: varchar("alpha2_code", { length: 2 }).notNull(),
	alpha3Code: varchar("alpha3_code", { length: 3 }).notNull(),
});

export const countryRelations = relations(country, ({ many }) => ({
	organization: many(organization),
	radio: many(radios),
}));
