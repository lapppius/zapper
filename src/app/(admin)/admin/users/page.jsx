import AdminUsersList from "@/components/Admin/AdminUsersList";
import { getUsers } from "../../../lib/postgres/users";

export default async function AdminUsers() {
	const users = await getUsers();
	/*
	 *Always use async/await
	 */

	return (
		<>
			<h1>Admin Users Panel</h1>
			<AdminUsersList users={users} />
		</>
	);
}
