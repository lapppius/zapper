import { logOut } from "@/app/actions";

export default function Logout() {
	return (
		<form action={logOut}>
			<button type="submit">logout</button>
		</form>
	);
}
