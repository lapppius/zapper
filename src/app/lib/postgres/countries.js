import db from "../db";
import { country } from "../schema/country";

export async function getCountries() {
	const countries = db.select().from(country);
	return countries;
}
