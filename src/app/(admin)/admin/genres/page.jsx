import AdminGenresList from "@/components/Admin/AdminGenresList";
import AdminCreateNewGenre from "@/components/Admin/AdminCreateNewGenre";

export default async function AdminGenres() {
	return (
		<>
			<p>Admin Genres</p>
			<AdminCreateNewGenre />
			<AdminGenresList />
		</>
	);
}
