"use client";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import NavLink from "./NavLink";

function SignOut() {
	return (
		<form
			action={() => {
				signOut();
			}}
		>
			<button>Sign Out</button>
		</form>
	);
}

export default function Menu({ image }) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();

	useEffect(() => {
		let handler = (event) => {
			if (!menuRef.current?.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<>
			<button onClick={() => setOpen((prev) => !prev)}>{image}</button>
			{open ? (
				<div
					ref={menuRef}
					className="border border-gray-600 absolute top-[50px] right-0 rounded-[--radius] m-2 bg-[--dark]"
				>
					<ul className="flex flex-col items-start w-full">
						<li>
							<NavLink href="/profile" title="Profile" />
						</li>
						<li>
							<SignOut />
						</li>
					</ul>
				</div>
			) : null}
		</>
	);
}
