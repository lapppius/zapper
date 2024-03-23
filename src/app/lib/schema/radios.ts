/**
 * This file declares a table schema for the radio stations using Drizzle ORM data types.
 */

import { radiosGenres } from "./genre";
import { relations } from "drizzle-orm";
import {
	pgTable,
	text,
	varchar,
	serial,
	timestamp,
	doublePrecision,
	smallint,
	numeric,
} from "drizzle-orm/pg-core";
import { organization } from "./organization";
import { country } from "./country";

export const radios = pgTable("radios", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	logo: varchar("logo"),
	description: text("description"),
	stream: varchar("stream", { length: 150 }).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	wikidataId: varchar("wikidata_id", { length: 50 }),
	lat: doublePrecision("lat"),
	lon: doublePrecision("lon"),
	organizationId: smallint("organization_id").references(() => organization.id),
	countryNumeric: numeric("country_numeric").references(() => country.numeric),
});

export const radioRelations = relations(radios, ({ many }) => ({
	radiosGenres: many(radiosGenres),
}));

export const radioOrganizationRelations = relations(radios, ({ one }) => ({
	organization: one(organization, {
		fields: [radios.organizationId],
		references: [organization.id],
	}),
}));

export const radioCountryRelations = relations(radios, ({ one }) => ({
	country: one(country, {
		fields: [radios.countryNumeric],
		references: [country.numeric],
	}),
}));
