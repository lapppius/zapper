export default function AuthMain(props) {
	return (
		<section className="min-w-fit max-w-40
		  mx-w-25 flex flex-col flex-nowrap items-center justify-center bg-[var(--admin-item-back)] p-6 rounded-md">
			<h1 className="mb-2 text-xl font-bold">{props.title}</h1>
			<form
				onSubmit={props.onSubmit}
				className="flex flex-col items-center space-y-5 flex-nowrap"
			>
				{props.children}
			</form>
		</section>
	);
}
