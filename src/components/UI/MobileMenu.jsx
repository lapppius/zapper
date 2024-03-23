"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Select from "./Select";

export default function MobileMenu({ options }) {
	const [selected, setSelected] = useState(null);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (selected !== null) {
			router.push(`${selected}`);
		}
	}, [selected, router]);

	return (
		<Select
			options={options}
			setSelected={setSelected}
			defaultValue={pathname}
		/>
	);
}
