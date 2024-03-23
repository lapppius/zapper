import { useRef } from "react";

export default function StorageLogosOptions() {
	const dialogRef = useRef(null);

	const toggle = (e) => {
		e.preventDefault();
		if (dialogRef.current.hasAttribute("open")) {
			dialogRef.current.close();
		} else {
			dialogRef.current.show();
		}
	};
	return (
		<div className="absolute  w-full h-full">
			<button onClick={toggle}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="w-4 h-4"
				>
					<path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
				</svg>
			</button>
			<dialog ref={dialogRef} className="rounded backdrop-blur-lg bg-transparent">
				<ul>
					<button>Delete</button>
					<button>Copy URL</button>
				</ul>
			</dialog>
		</div>
	);
}
