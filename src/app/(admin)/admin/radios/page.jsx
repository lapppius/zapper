import SearchBar from "@/components/SearchBar";
import AdminRadiosList from "@/components/Admin/AdminRadiosList";
import AdminCreateNewRadio from "@/components/Admin/AdminCreateNewRadio";
import AdminHeader from "@/components/Admin/AdminHeader";
import { getRadios } from "@/app/lib/postgres/radios";
import { redirect } from "next/navigation";

export default async function AdminRadios({ searchParams }) {
  const cursor = Number(searchParams.cursor) ?? "";
  const query = searchParams.q;
  const adminRadiosList = await getRadios({ query: query });

  const search = async (data) => {
    "use server";
    console.log(data);
    redirect(`/admin/radios?q=${encodeURIComponent(data)}`);
  };

  return (
    <>
      <AdminHeader>
        <AdminCreateNewRadio />
        <SearchBar placeholder={"Search for radios"} action={search} />
      </AdminHeader>
      <AdminRadiosList adminRadios={adminRadiosList} cursor={cursor} />
    </>
  );
}
