import RadiosList from "@/components/UI/RadiosList";
import { getGenreRadios, getGenreBySlug } from "../../../lib/postgres/genres";
import { notFound } from "next/navigation";

// export async function generateMetadata({ params }) {
//   const radios = await getGenreRadios(params.slug);
//   return {
//     // title: radios.genreName,
//   };
// }

export default async function Genre({ params }) {
	const genre = await getGenreBySlug(params.slug);
	const radios = await getGenreRadios(params.slug);
	console.log(radios);
	if (genre === undefined) {
		notFound();
	}

	return (
		<>
			<header className="w-full p-3 ">
				<h1 className="text-6xl font-[1000] leading-normal">{genre.name}</h1>
				<h2>{genre?.description}</h2>
			</header>
			<RadiosList radios={radios} />
		</>
	);
}
