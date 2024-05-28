import styles from "./progress.module.scss";
import Slider from "../UI/Slider";

import { useAtom } from "jotai";
import { playerAtom } from "./PlayerAtom";

import {
  // msToSec,
  // formatMillisecondsAsTime,
  formatSecondsAsTime,
} from "./utils";
import { useEffect, useState } from "react";

export default function Progress({ time, duration }) {
  const { player, buffered } = useAtom(playerAtom)[0];
  const [seekTime, setSeekTime] = useState(0);

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (player) {
      player.currentTime = seekTime;
      setSeekTime(seekTime);
    }
  };
  useEffect(() => {
    setSeekTime(time);
  }, [time]);

  return (
    <>
      <span className={`${styles.elapsedTime}  ${styles.text}`}>
        {formatSecondsAsTime(time)}
      </span>
      <div className={styles.progress}>
        <Slider
          max={duration}
          min="0"
          value={seekTime}
          step={duration / 1000}
          onChange={(e) => {
            handleSeek(e);
          }}
          seekBarValue={duration != 0 ? (seekTime / duration) * 100 : 0}
        />
        <div className={styles.barsContainer}>
          {/* <div
            style={{
              width: `${duration != 0 ? (seekTime / duration) * 100 : 0}%`,
            }}
            className={styles.barsContainer__seekedBar}
          ></div> */}
          <div
            style={{
              width: `${duration != 0 ? (buffered / duration) * 100 : 0}%`,
            }}
            className={styles.barsContainer__bufferedBar}
          ></div>
        </div>
      </div>
      <span className={`${styles.remainingTime}  ${styles.text}`}>
        {formatSecondsAsTime(duration)}
      </span>
    </>
  );
}
