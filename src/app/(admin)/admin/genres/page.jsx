import AdminGenresList from "@/components/Admin/AdminGenresList";
import AdminCreateNewGenre from "@/components/Admin/AdminCreateNewGenre";
import AdminHeader from "@/components/Admin/AdminHeader";

export default async function AdminGenres() {
  return (
    <>
      <AdminHeader>
        <AdminCreateNewGenre />
      </AdminHeader>
      <AdminGenresList />
    </>
  );
}
