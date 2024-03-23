"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../UI/Modal";

export default function AdminEditGenre({ genre }) {
	const router = useRouter();
	// const [open, setOpen] = useState(false);
	const [data, setData] = useState(genre);
	// const [info, setInfo] = useState(undefined);
	const [changed, setChanged] = useState(false);

	const handleChange = (key, value) => {
		setData((prevstate) => ({ ...prevstate, [key]: value }));
	};

	const editGenre = () => {
		fetch("/api/genres", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				router.refresh();
				console.log(res);
			});
	};

	const deleteGenre = async () => {
		fetch("/api/genres", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				// Authorization: `Bearer ${authContext.currentUser?.accessToken}`,
			},
			body: JSON.stringify({
				id: genre.id,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				router.refresh();
				console.log(res);
			});
	};

	useEffect(() => {
		setChanged(JSON.stringify(data) === JSON.stringify(genre));
	}, [data, genre]);

	return (
		<Modal
			title={`Επεξεργασία ${genre.genreName}`}
			icon={
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="w-4 h-4"
				>
					<path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
					<path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
				</svg>
			}
		>
			{Object.entries(genre).map(([key, value]) => (
				<input
					type="text"
					label={key}
					defaultValue={value}
					key={key}
					onChange={(e) => {
						handleChange(key, e.target.value);
					}}
				/>
			))}
			<button variant="contained" onClick={editGenre} disabled={changed}>
				ΑΠΟΘΗΚΕΥΣΗ
			</button>
			<button onClick={deleteGenre}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="w-4 h-4"
				>
					<path
						fillRule="evenodd"
						d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</Modal>
	);
}
