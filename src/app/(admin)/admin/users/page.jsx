import AdminUsersList from "@/components/Admin/AdminUsersList";
import { getUsers } from "../../../lib/postgres/users";

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <>
      <AdminUsersList users={users} />
    </>
  );
}
