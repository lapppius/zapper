"use client";
import Modal from "../UI/Modal";
import Form from "../UI/Form";
import TrashIcon from "../UI/Icons/TrashIcon";

export default function AdminDeleteItem({ item, deleteAction }) {
  return (
    <Modal icon={<TrashIcon />} title={`Διαγραφή ${item.name}`}>
      <Form action={deleteAction} submitTitle={"Delete"}></Form>
    </Modal>
  );
}
