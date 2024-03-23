export default function AdminUsersListItem({ user }) {
	return (
		<li key={user.index} className="p-2 mx-0 my-2 font-semibold rounded-lg ">
			<table className="w-full overflow-hidden *:border-collapse  ">
				<thead scope="col">
					<tr>
						{Object.entries(user).map(([key]) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody className="*:border-collapse ">
					<tr className="w-full *:max-w-[60px] *:h-full">
						{Object.entries(user).map(([key, value]) => (
							<td
								key={key}
								className="overflow-auto border border-[var(--light)]  text-wrap"
							>
								{typeof value === "object" ? value?.toString() : value}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</li>
	);
}
