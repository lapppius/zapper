import AdminList from "./AdminList";
import { deleteThisRadio, editThisRadio } from "@/components/Admin/actions";
import AdminDeleteRadio from "./AdminDeleteRadio";

// import Pagination from "@/components/UI/Pagination";

export default function AdminRadiosList({ adminRadios }) {
  // const cursor = adminRadios[adminRadios.length - 1].id;
  return (
    <>
      <AdminList
        data={adminRadios}
        editAction={editThisRadio}
        deleteAction={deleteThisRadio}
      />
      {/* <Pagination adminRadios={adminRadios} cursor={cursor} /> */}
    </>
  );
}
