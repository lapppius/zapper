"use client";
import Modal from "../UI/Modal";
import Form from "../UI/Form";
import TrashIcon from "../UI/Icons/TrashIcon";
// import Button from "../UI/Button";

import { deleteThisRadio } from "./actions";

export default function AdminDeleteRadio({ radio }) {
  return (
    <Modal icon={<TrashIcon />} title={`Διαγραφή ${radio.name}`}>
      <Form
        action={() => {
          deleteThisRadio(radio.id);
        }}
        submitTitle={"Delete"}
      ></Form>
    </Modal>
  );
}
