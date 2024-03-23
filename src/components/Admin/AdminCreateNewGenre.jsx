import Modal from "../UI/Modal";
import { addNewGenre } from "./actions";

export default function AdminCreateNewGenre() {
	const fields = ["name", "description"];

	return (
		<Modal title="Προσθήκη Είδους">
			<form action={addNewGenre} className="flex flex-col gap-y-2">
				{fields.map((field) => (
					<input type="text" placeholder={field} key={field} name={field} />
				))}
				<button type="submit">Προσθηκη Είδους</button>
			</form>
		</Modal>
	);
}
