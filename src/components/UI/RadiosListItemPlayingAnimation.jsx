"use client";
import PlayingBars from "./Animations/EqualizerIcon";
import styles from "./RadiosListItemPlayingAnimation.module.scss";
import { useAtom } from "jotai";
import { playerAtom } from "../Player/PlayerAtom";

export default function RadiosListItemPlayingAnimation({ id }) {
  const { playing, waiting, curId } = useAtom(playerAtom)[0];

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
