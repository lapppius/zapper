import SearchBar from "@/components/Admin/SearchBar";
import AdminRadiosList from "@/components/Admin/AdminRadiosList";
import AdminCreateNewRadio from "@/components/Admin/AdminCreateNewRadio";
import AdminHeader from "@/components/Admin/AdminHeader";
import { getRadios } from "@/app/lib/postgres/radios";


export default async function AdminRadios({ searchParams }) {
  const cursor = Number(searchParams.cursor) ?? "";
  const adminRadiosList = await getRadios(cursor);

  return (
    <>
      <AdminHeader>
        <AdminCreateNewRadio />
        <SearchBar placeholder={"Search for radios"} />
      </AdminHeader>
      <AdminRadiosList adminRadios={adminRadiosList} cursor={cursor} />
    </>
  );
}
