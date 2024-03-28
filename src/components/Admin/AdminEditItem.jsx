"use client";
import { useFormState } from "react-dom";
import Modal from "../UI/Modal";
import Form from "../UI/Form";
import EditIcon from "../UI/Icons/EditIcon";
import Input from "../UI/Input";

export default function AdminEditItem({ item, action }) {
  const [message, formAction] = useFormState(action, null);

  return (
    <Modal icon={<EditIcon />} title={`Επεξεργασία ${item.name}`}>
      <Form
        action={formAction}
        className="flex flex-col items-start gap-y-2"
        submitTitle={"Update"}
      >
        {Object.entries(item).map(([key, value]) => (
          <Input
            type="text"
            placeholder={key}
            defaultValue={value}
            key={key}
            name={key}
          />
        ))}
        {/* <GenreSelection setData={setUpdatedRadioData} genres={radio.genres} /> */}
        {message}
      </Form>
    </Modal>
  );
}
