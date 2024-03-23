import AdminEditGenre from "./AdminEditGenre";

export default function AdminGenresListItem({ genre }) {
	return (
		<li
			className="bg-[var(--admin-item-back)]  p-1 max-w-fit  flex items-center flex-row flex-wrap "
			id={genre.id}
		>
			<dl className="flex flex-row items-end justify-center gap-x-1">
				<dt className="font-bold">{genre.name}</dt>
				<dd>{genre.description}</dd>
			</dl>
			<AdminEditGenre genre={genre} />
		</li>
	);
}
