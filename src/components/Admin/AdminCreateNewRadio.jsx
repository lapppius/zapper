import { addNewRadio } from "./actions";
// import AdminRadioLocation from "./AdminRadioLocation";
// import GenreSelection from "../UI/GenreSelection";
// import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Form from "../UI/Form";

import UploadRadioLogo from "./UploadRadioLogo";
import dynamic from "next/dynamic";
const Input = dynamic(() => import("../UI/Input"), {
  loading: () => <p>Loading...</p>,
});

export default function AdminCreateNewRadio() {
  const fields = [
    { name: "logo", required: false },
    { name: "parent", required: false },
    { name: "name", required: true },
    { name: "stream", required: true },
    { name: "description", required: false },
    { name: "lat", required: false },
    { name: "lon", required: false },
  ];

  return (
    <Modal title="Add New Radio">
      <Form action={addNewRadio} submitTitle="Save Radio">
        {fields.map((field, i) => (
          <Input
            type="text"
            placeholder={field.name}
            key={i}
            name={field.name}
            id={field.name}
            label={field.name}
            required={field.required}
          />
        ))}
      </Form>
      <UploadRadioLogo />
      {/* <GenreSelection /> */}
    </Modal>
  );
}
