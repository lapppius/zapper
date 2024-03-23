import { notFound } from "next/navigation";
import RadioHeader from "@/components/Radio/RadioHeader";
import RadioSide from "@/components/Radio/RadioSide";
import { getRadioBySlug } from "@/app/lib/postgres/radios";

export async function generateMetadata({ params }) {
	const radio = await getRadioBySlug(params.slug);
	return {
		title: radio?.name,
		description: radio?.description,
		openGraph: {
			title: radio?.name,
			description: radio?.description,
			images: radio?.logo,
			publishedTime: radio?.createdAt,
			type: "music.radio_station",
			url: `/radio/${params.slug}`,
		},
	};
}

export default async function Radio({ params }) {
	const radio = await getRadioBySlug(params.slug);
	if (radio === undefined) {
		notFound();
	}

	return (
		<div className="grid grid-cols-[1fr_150px] grid-rows-[auto_auto] gap-1">
			<RadioHeader
				name={radio.name}
				stream={radio.stream}
				description={radio.description}
				id={radio.id}
				logo={radio.logo}
			/>
			<RadioSide radio={radio} />
		</div>
	);
}
