// import SocialMedia from "./SocialMedia";
// import { getWikidataEntity } from "@/app/lib/Wiki";

export default async function RadioSide({ radio }) {
	// getWikidataEntity(radio.wikidataID);

	return (
		<>
			<aside className="row-start-2 row-span-1 col-start-2 col-span-1 bg-[var(--secondary-dark)] rounded-[var(--radius)] p-2 ">
				{/* <SocialMedia {...props} /> */}
				<ul className="flex flex-col flex-wrap">{radio.wikidata}</ul>
			</aside>
		</>
	);
}
