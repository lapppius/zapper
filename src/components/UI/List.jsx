"use client";
import { useMemo } from "react";
import ListItem from "./ListItem";
import Image from "next/image";

export default function List({ data }) {
	const countriesList = useMemo(() => {
		return data;
	}, [data]);

	return (
		<ul className="flex flex-col w-full h-full gap-1 overflow-y-auto list-none bg-transparent flex-nowrap sm:justify-center sm:flex-row sm:flex-wrap">
			{countriesList.map((country) => (
				<ListItem country={country} key={country.numeric}>
					<div className="relative h-[40px] w-[40px] rounded-full overflow-hidden">
						<Image
							src={`/flags/png/${country.alpha2Code.toLowerCase()}.png`}
							alt={`Flag of ${country.enName}`}
							fill
							sizes="(max-width: 350px) 20px,(max-width: 768px) 40px"
							style={{
								objectFit: "cover",
							}}
							loading="lazy"
						/>
					</div>
					{country.enName}
				</ListItem>
			))}
		</ul>
	);
}
