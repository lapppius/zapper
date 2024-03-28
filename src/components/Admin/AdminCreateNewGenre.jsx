import Modal from "../UI/Modal";
import Form from "../UI/Form";
import Input from "../UI/Input";
import { addNewGenre } from "./actions";

export default function AdminCreateNewGenre() {
  const fields = [
    { name: "name", required: true, placeholder: "A genre name" },
    {
      name: "description",
      required: true,
      placeholder: "Description for the genre",
    },
  ];

  return (
    <Modal title="Προσθήκη Είδους">
      <Form
        action={addNewGenre}
        className="flex flex-col gap-y-2"
        submitTitle="Save New Genre"
      >
        {fields.map((field) => (
          <Input
            type="text"
            placeholder={field.placeholder}
            key={field}
            name={field.name}
            label={field.name}
            required={field.required}
          />
        ))}
      </Form>
    </Modal>
  );
}
