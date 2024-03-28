import { getGenres } from "../../app/lib/postgres/genres";
import AdminList from "./AdminList";

export default async function AdminGenresList() {
  const genres = await getGenres();

  return <AdminList data={genres} />;
}
