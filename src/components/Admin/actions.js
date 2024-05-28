"use server";
import { editRadio, deleteRadio, addRadio } from "@/app/lib/postgres/radios";
import { addGenre, getGenres } from "@/app/lib/postgres/genres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upload(data) {
  const file = data.get("file");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `public/logos/${file.name}`;
  await writeFile(path, buffer);

  return { success: true, path: path };
}

export async function addNewRadio(formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const logo = formData.get("logo");
  const stream = formData.get("stream");

  await addRadio({ name, description, logo, stream });
  redirect("/admin/radios");
}

export async function editThisRadio(prevState, formData) {
  if (formData === null) {
    return "No changes to submit";
  }
  {
    console.log("prevState: ", prevState);
    const newData = Object.fromEntries(formData.entries());
    editRadio(newData);
    revalidatePath("/admin/radios");
    revalidatePath("/");
    return "Edit was successful!";
  }
}

export async function deleteThisRadio(formData) {
  console.log(formData);
  await deleteRadio();
  revalidatePath("/admin/radios");
}

export async function addNewGenre(formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  await addGenre({ name, description });
  revalidatePath("/admin/genres");
}

export async function getAllGenres() {
  const genres = await getGenres();
  console.log(genres);
  return genres;
}
