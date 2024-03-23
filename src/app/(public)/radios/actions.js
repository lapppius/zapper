"use server";
import { getRadios } from "../lib/firestore/getRadios";

export async function fetchRadios(order, perPage, action, cursor) {
	const res = await JSON.parse(
		JSON.stringify(await getRadios(order, perPage, action, cursor))
	);
	console.log(res);
	return res;
}
