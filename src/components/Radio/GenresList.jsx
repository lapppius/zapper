import styles from "./genresList.module.css";
import Link from "next/link";

export default function GenresList({ genres }) {
	return (
		<ul className={styles.genresList}>
			{genres?.map((genre) => {
				return (
					<li key={genre.id}>
						<Link href={`/genre/${genre.slug}`}>{genre.name}</Link>
					</li>
				);
			})}
		</ul>
	);
}
