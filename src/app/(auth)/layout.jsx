export default function AuthLayout({ children }) {
	return (
		<>
			<main className="w-full flex flex-col items-center justify-center [&_button]:bg-slate-600 [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-md">
				{children}
			</main>
		</>
	);
}
