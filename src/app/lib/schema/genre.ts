import { relations } from "drizzle-orm";
import { radios } from "./radios";
import {
	serial,
	pgTable,
	varchar,
	text,
	integer,
	primaryKey,
} from "drizzle-orm/pg-core";

export const genre = pgTable("genre", {
	id: serial("id").notNull().primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	description: text("description"),
});

export const genreRelations = relations(genre, ({ many }) => ({
	radiosGenres: many(radiosGenres),
}));

export const radiosGenres = pgTable(
	"radios_genres",
	{
		radio_id: integer("radio_id")
			.notNull()
			.references(() => radios.id),
		genre_id: integer("genre_id")
			.notNull()
			.references(() => genre.id),
	},
	(rg) => ({
		compoundKey: primaryKey({ columns: [rg.radio_id, rg.genre_id] }),
	})
);

// https://orm.drizzle.team/docs/rqb#many-to-many

export const radiosGenresRelations = relations(radiosGenres, ({ one }) => ({
	radio: one(radios, {
		fields: [radiosGenres.radio_id],
		references: [radios.id],
	}),
	genre: one(genre, {
		fields: [radiosGenres.genre_id],
		references: [genre.id],
	}),
}));
