import styles from "./progress.module.scss";
import Slider from "../UI/Slider";
import {
  // msToSec,
  // formatMillisecondsAsTime,
  formatSecondsAsTime,
} from "./utils";

export default function Progress({ progress, time, duration }) {
  return (
    <>
      <span className={`${styles.elapsedTime}  ${styles.text}`}>
        {formatSecondsAsTime(time)}
      </span>
      <div className={styles.progress}>
        <Slider max={duration} min="0" value={time} step={duration / 1000} />
        <div className="absolute flex w-full h-full">
          <div
            // style={{ width: "100%" }}
            style={{ width: `${(progress / duration) * 100}%` }}
            className="h-1 bg-black"
          ></div>
        </div>
      </div>
      <span className={`${styles.remainingTime}  ${styles.text}`}>
        {formatSecondsAsTime(duration)}
      </span>
    </>
  );
}
