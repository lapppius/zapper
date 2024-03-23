import { getGenres } from "../../app/lib/postgres/genres";
import AdminGenresListItem from "./AdminGenresListItem";

export default async function AdminGenresList() {
	const genres = await getGenres();
	console.log(genres);

	return (
		<ul className="flex flex-wrap gap-1 p-0 m-0 list-none">
			{genres.map((genre) => (
				<AdminGenresListItem genre={genre} key={genre.id} />
			))}
		</ul>
	);
}
