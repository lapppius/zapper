import RadiosList from "@/components/UI/RadiosList";
import { getRadios } from "@/app/lib/postgres/radios";

export default async function Radios() {
	const radiosList = await getRadios();
	return (
		<>
			{/* <RadiosList radios={radiosList.radios} /> */}

			<RadiosList radios={radiosList} />
			{/* <PaginationControls radios={JSON.parse(JSON.stringify(radiosList))} /> */}
		</>
	);
}
