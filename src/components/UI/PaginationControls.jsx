"use client";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaginationControls({ radios }) {
	const pathname = usePathname();
	const [cursor, setCursor] = useState();
	const searchParams = useSearchParams();
	// const last = searchParams.get("last");

	const perPage = Number(searchParams.get("perPage") || 3);

	useEffect(() => {
		setCursor(radios.cursor);
	}, [radios]);

	return (
		<section className="[&>*]:bg-slate-500 [&>*]:m-2  [&>*]:p-1 [&>*]:rounded-md flex justify-center">
			<Link
				href={`${pathname}/?cursor=${cursor}&action=previous&perPage=${perPage}`}
			>
        Previous
			</Link>
			<Link
				tabIndex={!radios.next ? -1 : null}
				className={` disabled:${!radios.next} aria-disabled:${!radios.next} ${
					!radios.next ? "pointer-events-none opacity-25" : null
				}`}
				href={`${pathname}/?cursor=${cursor}&action=next&perPage=${perPage}`}
			>
        Next
			</Link>
		</section>
	);
}
