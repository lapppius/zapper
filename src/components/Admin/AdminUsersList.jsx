import AdminUsersListItem from "./AdminUsersListItem";
export default function AdminUsersList({ users }) {
	return (
		<ul className="p-0 list-none">
			{users.map((user, index) => (
				<AdminUsersListItem key={index} user={user} />
			))}
		</ul>
	);
}
