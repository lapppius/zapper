import { relations } from "drizzle-orm";
import { numeric, pgTable, smallserial, varchar } from "drizzle-orm/pg-core";
import { country } from "./country";

export const organization = pgTable("organization", {
	id: smallserial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 150 }).notNull().unique(),
	legalName: varchar("legal_name", { length: 100 }),
	website: varchar("website", { length: 100 }),
	countryId: numeric("country_id").references(() => country.numeric),
});

export const organizationRelations = relations(organization, ({ one }) => ({
	country: one(country, {
		fields: [organization.countryId],
		references: [country.numeric],
	}),
}));
