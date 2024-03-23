"use client";
import { useEffect, useState } from "react";
import { getAllGenres } from "../Admin/actions";

export default function GenreSelection() {
	const [selected, setSelected] = useState([]);

	const [availableGenres, setAvailableGenres] = useState([]);
	// const [toFadeOut, setToFadeOut] = useState(null);

	useEffect(() => {
		getAllGenres().then((res) => setAvailableGenres(res));
	}, []);

	const handleChange = (genre) => {
		if (
			selected &&
			Object.values(selected).some((obj) => obj.id === genre[0].id)
		) {
			handleRemove(genre[0].id);
		} else {
			setSelected([...selected,genre[0]]);
		}
	};

	const handleRemove = (id) => {
		// setToFadeOut(id);

		// Deselect the genre and remove it from the selected state object
		const updatedSelected = Object.values(selected).filter(
			(genreItem) => genreItem.id !== parseInt(id)
		);
		console.log(updatedSelected);
		setSelected(updatedSelected);
		// setToFadeOut(null);
	};

	return (
		<div className="m-1">
			{selected != null ? (
				<ul className="flex flex-row flex-wrap p-0 m-0 list-none border rounded-md">
					{Object.entries(selected).map(([key, value]) => (
						<li
							key={key}
							id={value.id}
							className="flex items-center w-auto px-1 m-1 overflow-hidden border rounded-lg "
						>
							<span>{value.name}</span>
							<button
								id={value.id}
								onClick={(e) =>
									handleRemove(e.target.parentElement.parentElement.id)
								}
								className="hover:bg-[var(--button-hover-back)] p-1px ml-1 border border-gray-400 rounded-full "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="white"
									className="w-4 h-4"
								>
									<path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
								</svg>
							</button>
						</li>
					))}
				</ul>
			) : undefined}
			<select
				multiple
				value={selected ? Array.from(selected) : []}
				onChange={(e) =>
					handleChange(
						Array.from(e.target.selectedOptions, (option) =>
							JSON.parse(option.dataset.genre)
						)
					)
				}
				className="w-full m-w-500px bg-[color:var(--dark)]"
			>
				{availableGenres?.map((item) => (
					<option
						key={item.id}
						value={item.slug}
						data-genre={JSON.stringify(item)}
					>
						{item.name}
					</option>
				))}
			</select>
		</div>
	);
}
