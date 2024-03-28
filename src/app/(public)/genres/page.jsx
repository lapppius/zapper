import GenresList from "../../../components/Radio/GenresList";
import { getGenres } from "../../lib/postgres/genres";

export default async function Genres() {
  const genres = await getGenres();

  return (
    <>
      <GenresList genres={genres} />
    </>
  );
}
