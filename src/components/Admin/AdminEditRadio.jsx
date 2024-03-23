"use client";
import { useFormState } from "react-dom";
import { editThisRadio } from "@/components/Admin/actions";
import Modal from "../UI/Modal";
import EditIcon from "../UI/Icons/EditIcon";
import SubmitButton from "../UI/SubmitButton";
import Input from "../UI/Input";

export default function AdminEditRadio({ radio }) {
	const [message, formAction] = useFormState(editThisRadio, null);

	return (
		<Modal icon={<EditIcon />} title={`Επεξεργασία ${radio.name}`}>
			<form action={formAction} className="flex flex-col items-start gap-y-3">
				{Object.entries(radio).map(([key, value]) => (
					<Input
						type="text"
						// placeholder={key}
						defaultValue={value}
						key={key}
						name={key}
					/>
				))}
				{/* <GenreSelection setData={setUpdatedRadioData} genres={radio.genres} /> */}
				<SubmitButton radio={radio} />
				{message}
			</form>
		</Modal>
	);
}
