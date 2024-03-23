import AdminRadiosSearchBar from "@/components/Admin/AdminRadiosSearchBar";
import AdminRadiosList from "@/components/Admin/AdminRadiosList";
import AdminCreateNewRadio from "@/components/Admin/AdminCreateNewRadio";
import { getRadios } from "@/app/lib/postgres/radios";

export default async function AdminRadios({ searchParams }) {
	const cursor = Number(searchParams.cursor) ?? "";
	console.log(cursor);
	const adminRadiosList = await getRadios(cursor);

	return (
		<>
			<p>Admin Radios console</p>
			<AdminCreateNewRadio />
			<AdminRadiosSearchBar />
			<AdminRadiosList adminRadios={adminRadiosList} cursor={cursor} />
		</>
	);
}
