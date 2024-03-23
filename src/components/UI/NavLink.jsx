"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, title }) {
	// let callbackUrl;
	// if (window && !window.location.pathname.startsWith("/login")) {
	// 	callbackUrl = window.location.pathname;
	// } else {
	// 	callbackUrl = window.location.hostname;
	// }
	const pathname = usePathname();
	const [isActive, setIsActive] = useState();

	useEffect(() => {
		setIsActive(pathname === href);
	}, [pathname, href]);

	return (
		<li className="	hover:[&>a]:bg-[--dark-cyan-back] [&>a]:flex [&>a]:items-center  [&>a]:rounded-[var(--radius)] text-base [&>a]:px-2 [&>a]:py-1 hover:[&>a]:no-underline text-[var(--secondary-light)] font-[800] capitalize my-2">
			<Link
				href={href}
				className={
					isActive
						? "font-semibold border border-1 border-[var(--cream)]"
						: null
				}
			>
				{title}
			</Link>
		</li>
	);
}
