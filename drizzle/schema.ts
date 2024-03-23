import { pgTable, unique, pgEnum, varchar, serial, text, timestamp, doublePrecision, foreignKey, primaryKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['ADMIN', 'USER'])


export const radio = pgTable("radio", {
	name: varchar("name", { length: 100 }).notNull(),
	stream: varchar("stream", { length: 150 }).notNull(),
	id: serial("id").primaryKey().notNull(),
	logo: varchar("logo"),
	slug: varchar("slug", { length: 100 }).notNull(),
	description: text("description"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	lat: doublePrecision("lat"),
	lon: doublePrecision("lon"),
	wikidataId: varchar("wikidataID", { length: 50 }),
},
(table) => {
	return {
		radioSlugUnique: unique("radio_slug_unique").on(table.slug),
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
});

export const radiosGenres = pgTable("radios_genres", {
	radioId: integer("radio_id").notNull().references(() => radio.id),
	genreId: integer("genre_id").notNull().references(() => genre.id),
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