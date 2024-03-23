import db from "../db";
import { genre } from "../schema/genre";
import slugify from "@/utils/slugify";
import { radios } from "../schema/radios";
import { radiosGenres } from "../schema/genre";

import { eq } from "drizzle-orm";

export async function addGenre(data) {
	const { name, description } = data;

	await db.insert(genre).values({
		name: name,
		description: description,
		slug: slugify(name),
	});
}

export async function getGenres() {
	const genres = await db.select().from(genre);
	return genres;
}

export async function getGenreRadios(slug) {
	const genreRadios = await db
		.select({ ...radios })
		.from(radios)
		.rightJoin(radiosGenres, eq(radios.id, radiosGenres.radio_id))
		.rightJoin(genre, eq(genre.id, radiosGenres.genre_id))
		.where(eq(genre.slug, slug));
	return genreRadios;
}

export async function getGenreBySlug(slug) {
	const res = await db.select().from(genre).where(eq(genre.slug, slug));
	return res[0];
}
