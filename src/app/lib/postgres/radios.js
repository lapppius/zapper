import db from "../db";
import { eq, asc, desc, sql } from "drizzle-orm";
import { radios } from "../schema/radios";
import slugify from "@/utils/slugify";
import extractWords from "@/utils/extractWords";

export async function editRadio(newData) {
  try {
    await db
      .update(radios)
      .set({
        name: newData.name,
        description: newData.description,
        logo: newData.logo,
        stream: newData.stream,
      })
      .where(eq(radios.id, newData.id));
  } catch (error) {
    console.log(error);
  }
}

export async function getRadios({ orderBy = "asc", limit = 5, query = null }) {
  let order;
  const queryWords = extractWords(query);
  let complexQuery = "";

  if (query != null) {
    for (let i = 0; i < queryWords.length; i++) {
      complexQuery = complexQuery.concat(
        `radios.name ILIKE '%${queryWords[i]}%' ${
          i < queryWords.length - 1 ? "OR " : ""
        }`
      );
    }
  }

  if (orderBy === "desc") {
    order = desc(radios.createdAt);
  } else {
    order = asc(radios.createdAt);
  }

  try {
    let queryBuilder = db.select().from(radios).orderBy(order).limit(limit);

    if (query != null) {
      queryBuilder = queryBuilder.where(
        sql`radios.name ILIKE '%' || ${query} || '%'`
      );
    }

    const res = await queryBuilder;
    return res;
  } catch (error) {
    console.error("Error connecting with the database", error);
  }
}

export async function addRadio(data) {
  const { name, description, logo, stream } = data;
  await db.insert(radios).values({
    name: name || null,
    slug: slugify(name) || null,
    description: description || null,
    logo: logo || null,
    stream: stream || null,
  });
}

export async function getRadioBySlug(slug) {
  const res = await db.select().from(radios).where(eq(radios.slug, slug));
  return res[0];
}

export async function getRadiosInRadius() {}

export async function deleteRadio(id) {
  await db.delete(radios).where(eq(radios.id, id));
}

// SELECT *
// FROM radio
// WHERE earth_box(
//   ll_to_earth(40.632948, 22.941454),
//  4930
// ) @> ll_to_earth(lat, lon);
