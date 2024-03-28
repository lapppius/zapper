"use client";
// import { useEffect, useRef, useState } from "react";

import Image from "next/image";

export default function UploadRadioLogo() {
	return (
		<section className="grid grid-cols-[90px_1fr] grid-rows-[auto_auto_auto_auto_auto] border border-gray-600  rounded bg-slate-900 p-2 my-2 text-sm gap-1 ">
			<div className="grid items-center justify-center col-span-1 col-start-1 row-span-3 row-start-1 overflow-hidden border border-gray-600 rounded-lg ">
				<Image
					alt=""
					src={
						"data:image/png;base64,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"
					}
					height="75"
					width="75"
				/>
				<div className="absolute self-end w-auto h-auto justify-self-start drop-shadow">
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="w-5 h-5"
						>
							<path
								fillRule="evenodd"
								d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="flex items-center col-start-2 row-span-1 row-start-1">
				<input
					type="text"
					placeholder="Image URL"
					// onChange={(e) => setURLfile(e.target.value)}
					className={`rounded-md bg-slate-800 `}
				/>
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div className="flex items-center col-start-2 row-span-1 row-start-2 overflow-auto">
				<input type="file" accept="image/*" />
				<button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<button
				className="flex flex-row items-center col-start-2 row-span-1 row-start-3 p-1 rounded-md bg-slate-800 w-fit"
				alt="Upload File"
			>
				Upload
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-5 h-5"
				>
					<path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
					<path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
				</svg>
			</button>
			{/* list of available/uploaded logo images */}
			<search className="col-span-2 col-start-1 row-span-1 row-start-4 ">
				<input type="search" className="w-3/4 rounded-md bg-slate-800" />
			</search>
			{/* <StorageLogos storageLogos={storageLogos} /> */}
		</section>
	);
}
