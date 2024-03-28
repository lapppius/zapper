"use client";
import styles from "./PlayPauseButton.module.scss";
import LoadingDots from "../UI/Icons/LoadingDots";
import PauseIcon from "../UI/Icons/PauseIcon";
import PlayIcon from "../UI/Icons/PlayIcon";
import { useAtom } from "jotai";
import { playerAtom } from "../Player/PlayerAtom";

export default function PlayPauseButton({ setCurrent, title, id }) {
  const { playing, waiting, curId } = useAtom(playerAtom)[0];

  return (
    <button
      onClick={setCurrent}
      className={`${styles.button}`}
      title={"play"}
      aria-label={title}
    >
      {playing && !waiting && id == curId ? (
        <PauseIcon />
      ) : !playing && waiting && id == curId ? (
        <LoadingDots />
      ) : (
        <PlayIcon />
      )}
    </button>
  );
}
