"use client";
import PlayingBars from "../Animations/EqualizerIcon";

import { usePlayer } from "@/contexts/PlayerContext";
import styles from "./RadiosListItemPlayingAnimation.module.css";

export default function RadiosListItemPlayingAnimation({ id }) {
	const playerContext = usePlayer();
	const { playing, waiting, curId } = playerContext.playerState;
	return (
		<>
			{playing && !waiting && curId === id ? (
				<span className={styles.equalizerWrapper}>
					<PlayingBars />
				</span>
			) : null}
		</>
	);
}
