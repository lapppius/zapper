export default function UserLayout({ children }) {
	return (
		<main className=" max-w-[var(--content-width)] grid gap-2 my-1 *:p-2 w-full grid-cols-1 grid-rows-auto sm:grid-cols-[150px_1fr] grid-rows-[auto_auto_1fr] sm:grid-rows-[auto_1fr] user_layout sm:m-3 sm:*:border-gray-600 sm:*:border *:rounded-[--radius] *:border *:border-gray-600 *:bg-[var(--secondary-dark)]">
			{children}
		</main>
	);
}
