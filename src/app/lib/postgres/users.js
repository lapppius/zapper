import db from "../db";
import { users } from "../schema/users";

export async function getUsers() {
	try {
		const res = await db.select().from(users);
		return res;
	} catch (error) {
		return error;
	}
}
