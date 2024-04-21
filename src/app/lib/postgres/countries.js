import { eq } from "drizzle-orm";
import db from "../db";
import { country } from "../schema/country";

export async function getCountries() {
  const countries = await db.select().from(country);
  return countries;
}

export async function getCountry(alpha2code) {
  const res = await db
    .select()
    .from(country)
    .where(eq(country.alpha2Code, alpha2code.toUpperCase()));
  return res[0];
}
