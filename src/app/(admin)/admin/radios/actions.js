"use server";
import { deleteRadio } from "@/app/lib/postgres/deleteRadio";
import { editRadio } from "../../../lib/postgres/editRadio";

export const deleteThisRadio = async (id) => {
	const res = await deleteRadio(id);
	return res;
};

export const editThisRadio = async (id, data) => {
	const res = await editRadio(id, data);
	return res;
};
