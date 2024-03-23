"use client";
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
// import { getWikidataEntityPromise } from "../../FetchFunctions";
// import NowPlaying from "./NowPlaying";
import styles from "./player.module.css";
import PlayerControls from "./PlayerControls";

let prevPlayingID = undefined;

export default function Player() {
	const [time, setTime] = useState(0);
	const audioElement = useRef();
	const playerContext = usePlayer();
	const { playing, streamUrl, audioContext, gainNode, curId } =
		playerContext.playerState;

	let sourceNode;
	async function setCurrentPlaying(id, audio, source, audioContext) {
		playerContext.playerDispatch({
			payload:
				new AudioContext() || window.AudioContext || window.webkitAudioContext,
		});
		if (audioContext) {
			playerContext.playerDispatch({
				payload: audioContext.createGain(),
			});
			initializeAudio(audioElement.current);
		}
		// check if context is in suspended state (autoplay policy)
		if (audioContext?.state === "suspended") {
			await audioContext.resume();
		}

		try {
			if (id === prevPlayingID && !audio.paused) return;

			try {
				audio.src = source;
				await audio.play();
				console.log("Audio has been loaded successfully!");
			} catch (error) {
				// Handle errors
				console.error("Error during playback:", error);
			}

			prevPlayingID = id;
		} catch (error) {
			console.log(error);
		}
	}
	function initializeAudio(audioElement) {
		// pass audio element into the audio context
		if (!sourceNode) {
			sourceNode = audioContext.createMediaElementSource(audioElement);

			sourceNode.connect(gainNode).connect(audioContext.destination);
		}
	}

	useEffect(() => {
		if (streamUrl !== undefined) {
			setCurrentPlaying(curId, audioElement.current, streamUrl, audioContext);
		}
	});

	useEffect(() => {
		if (playing === true && streamUrl !== undefined) {
			setCurrentPlaying(curId, audioElement.current, streamUrl, audioContext);
		} else if (playing === false && streamUrl !== undefined) {
			audioElement.current.pause();
			if (audioContext) {
				audioContext.suspend();
			}
		}
	});

	return (
		<div
			className={`${styles.player} grid grid-cols-1 grid-rows-[auto] bg-[var(--secondary-dark)] content-center px-1 box-border bottom-0 w-full h-auto backdrop-blur-xl border-t-[color:var(--dark-cyan-back)] border-t-[0.1px] border-solid justify-items-center`}
		>
			<div className="max-w-[var(--wide-width)] w-full">
				{/* <NowPlaying /> */}
				<audio
					onCanPlay={() => playerContext.playerDispatch({ type: "SET_PLAY" })}
					onWaiting={() =>
						playerContext.playerDispatch({ type: "SET_WAITING" })
					}
					onPause={() => playerContext.playerDispatch({ type: "SET_PAUSE" })}
					onTimeUpdate={(e) => setTime(e.target.currentTime)}
					id={styles["playerAudio"]}
					ref={audioElement}
					crossOrigin="anonymous"
				/>
				<PlayerControls time={time} />
			</div>
		</div>
	);
}
