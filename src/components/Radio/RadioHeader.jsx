import PlayPauseButton from "../UI/PlayPauseButton";
import RadioImg from "../UI/RadioImg";
// import GenresList from "./GenresList";

export default function RadioHeader(props) {
	return (
		<header className="row-start-1 row-span-1 col-start-1 col-span-2 grid grid-cols-1 sm:grid-cols-[auto_1fr] sm:grid-rows-[auto_100px_auto] sm:justify-items-start grid-rows-[auto_auto_auto_auto] sm:gap-x-4 gap-y-1 m-2 justify-items-center ">
			<div className="row-start-1 row-end-1 row-span-full sm:row-start-1 sm:row-span-3">
				<RadioImg
					title={props.name}
					id={props.id}
					src={props.logo}
					height="180"
					width="180"
					style="radioLogoContainer"
				/>
			</div>
			<div className="row-start-2 row-end-2 row-span-full sm:row-start-1 sm:col-start-2">
				<h1 className="text-xl font-extrabold">{props?.name}</h1>
			</div>
			<div className="box-border row-span-1 row-start-4 sm:row-start-2 sm:col-start-2">
				<p className=" line-clamp-3">{props?.description}</p>
			</div>

			<div className="flex flex-row flex-wrap items-center row-span-1 row-start-3 gap-1 sm:row-start-3 sm:col-start-2">
				<PlayPauseButton
					style="radioPlayButton"
					id={props.id}
					streamUrl={props.stream}
					title={props.title}
				/>
			</div>
			{/* <GenresList genres={props.genres} /> */}
		</header>
	);
}
