import Link from "next/link";

export default function Pagination({ cursor, adminRadios }) {
	const prev = adminRadios[0].id;
	const next = adminRadios[adminRadios.length - 1].id;
	return (
		<div className="flex flex-col w-full p-1">
			{cursor > 1 ? (
				<Link href={`?cursor=${prev}&type=prev`} className="place-self-start">
					Previous
				</Link>
			) : null}
			<Link
				href={`?cursor=${next}&type=next`}
				className="place-self-end"
			></Link>
		</div>
	);
}
