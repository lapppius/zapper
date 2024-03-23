import { addNewRadio } from "./actions";
// import AdminRadioLocation from "./AdminRadioLocation";
import GenreSelection from "../UI/GenreSelection";
import Modal from "../UI/Modal";
import UploadRadioLogo from "./UploadRadioLogo";

export default function AdminCreateNewRadio() {
	const fields = [
		"logo",
		"parent",
		"name",
		"stream",
		"city",
		"country",
		"description",
	];

	return (
		<Modal title="Προσθήκη Ραδιοφώνου">
			<UploadRadioLogo />
			<form action={addNewRadio} className="*:my-1">
				{fields.map((field, i) => (
					<input type="text" placeholder={field} key={i} name={field} />
				))}
				<button type="submit">Προσθηκη Ραδιοφωνου</button>
			</form>
			{/* <GenreSelection /> */}
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
			<h1>TEST</h1>
		</Modal>
	);
}
