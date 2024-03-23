"use client";
import Modal from "../UI/Modal";
import TrashIcon from "../UI/Icons/TrashIcon";

import { deleteThisRadio } from "./actions";

export default function AdminDeleteRadio({ radio }) {
	return (
		<Modal icon={<TrashIcon />} title={`Διαγραφή ${radio.name}`}>
			<form
				action={() => {
					deleteThisRadio(radio.id);
				}}
			>
				<button type="submit">Οριστικη Διαγραφη</button>
				<button>Ακυρο</button>
			</form>
		</Modal>
	);
}
