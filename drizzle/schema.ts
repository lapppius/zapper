import { pgTable, foreignKey, unique, pgEnum, smallserial, varchar, numeric, serial, text, timestamp, doublePrecision, smallint, primaryKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['ADMIN', 'USER'])


export const organization = pgTable("organization", {
	id: smallserial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 150 }).notNull(),
	legalName: varchar("legal_name", { length: 100 }),
	website: varchar("website", { length: 100 }),
	countryId: numeric("country_id").references(() => country.numeric),
},
(table) => {
	return {
		organizationSlugUnique: unique("organization_slug_unique").on(table.slug),
	}
});

export const country = pgTable("country", {
	numeric: numeric("numeric").primaryKey().notNull(),
	enName: varchar("en_name", { length: 200 }).notNull(),
	alpha2Code: varchar("alpha2_code", { length: 2 }).notNull(),
	alpha3Code: varchar("alpha3_code", { length: 3 }).notNull(),
});

export const radios = pgTable("radios", {
	name: varchar("name", { length: 100 }).notNull(),
	stream: varchar("stream", { length: 255 }).notNull(),
	id: serial("id").primaryKey().notNull(),
	logo: varchar("logo"),
	slug: varchar("slug", { length: 100 }).notNull(),
	description: text("description"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	lat: doublePrecision("lat"),
	lon: doublePrecision("lon"),
	wikidataId: varchar("wikidata_id", { length: 50 }),
	organizationId: smallint("organization_id").references(() => organization.id),
	countryNumeric: numeric("country_numeric").references(() => country.numeric),
},
(table) => {
	return {
		radiosSlugUnique: unique("radios_slug_unique").on(table.slug),
	}
});

export const genre = pgTable("genre", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull(),
	description: text("description"),
},
(table) => {
	return {
		genreSlugUnique: unique("genre_slug_unique").on(table.slug),
	}
});

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
	role: role("role").default('USER').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const radiosGenres = pgTable("radios_genres", {
	radioId: integer("radio_id").notNull().references(() => radios.id, { onDelete: "cascade" } ),
	genreId: integer("genre_id").notNull().references(() => genre.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		radiosGenresRadioIdGenreIdPk: primaryKey({ columns: [table.radioId, table.genreId], name: "radios_genres_radio_id_genre_id_pk"})
	}
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"})
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"})
	}
});