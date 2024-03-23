import Link from "next/link";
import PlayPauseButton from "./PlayPauseButton";
import RadioImg from "./RadioImg";
import RadiosListItemPlayingAnimation from "./RadiosListItemPlayingAnimation";

export default function RadiosListItem(props) {
	return (
		<li
			tabIndex="0"
			title={props.radioName}
			className="grid transition-[background-color] duration-[0.2s] ease-[ease-in-out] grid-cols-[auto_1fr_0] grid-rows-[auto] sm:shadow-md sm:rounded-[--radius] content-center gap-1 px-2 py-1 items-center text-base border-b-[1px] last:border-b-0 sm:border-b-0 sm:bg-[--secondary-dark] cursor-pointer font-light"
			key={props.id}
			id={props.id}
		>
			<div className="relative grid items-center justify-center">
				<RadioImg
					title={props.title}
					id={props.id}
					height="50"
					width="50"
					src={props.logoURL}
					style={"listImageContainer"}
				/>
				<span>
					<PlayPauseButton
						id={props.id}
						streamUrl={props.streamUrl}
						title={props.title}
						slug={props.slug}
					/>
				</span>
			</div>

			<Link
				className=" hover:no-underline h-100 transition-[color] duration-[0.2s] ease-[ease-in-out] delay-[0s]"
				href={`/radio/${props.id != null ? props.slug : ""}`}
			>
				<div className="grid items-center h-100 w-100">
					<p className="leading-normal text-left truncate">{props.title}</p>
				</div>
			</Link>
			<RadiosListItemPlayingAnimation id={props.id} />
		</li>
	);
}
