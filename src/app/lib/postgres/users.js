import db from "../db";
import { users } from "../schema/users";

export async function getUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    return error;
  }
}
