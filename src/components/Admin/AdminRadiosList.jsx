import AdminList from "./AdminList";
import { editThisRadio } from "@/components/Admin/actions";

// import Pagination from "@/components/UI/Pagination";

export default function AdminRadiosList({ adminRadios }) {
  // const cursor = adminRadios[adminRadios.length - 1].id;
  return (
    <>
      <AdminList data={adminRadios} editAction={editThisRadio} />
      {/* <Pagination adminRadios={adminRadios} cursor={cursor} /> */}
    </>
  );
}
