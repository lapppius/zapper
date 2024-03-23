import RadiosListItem from "./RadiosListItem";

export default function RadiosList(props) {
	return (
		<ul className="flex flex-col w-full list-none bg-transparent flex-nowrap sm:justify-center sm:flex-row sm:flex-wrap sm:gap-1">
			{props.radios
				? Object.entries(props.radios).map(([key, radio]) => (
						<RadiosListItem
							key={key}
							id={radio.id}
							title={radio.name}
							streamUrl={radio.stream}
							logoURL={radio.logo}
							slug={radio.slug}
						/>
				))
				: null}
		</ul>
	);
}
