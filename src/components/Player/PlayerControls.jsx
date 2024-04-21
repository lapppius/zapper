import styles from "./playerControls.module.scss";
import PlayerButton from "./PlayerButton";
import VolumeControls from "./Volume/volumeControls";
import Artwork from "./Artwork";
import Progress from "./Progress";

// import { useAtom } from "jotai";
// import { playerAtom } from "../Player/PlayerAtom";
import PlayIcon from "../UI/Icons/PlayIcon";
import PauseIcon from "../UI/Icons/PauseIcon";
import LoadingDots from "../UI/Icons/LoadingDots";

export default function PlayerControls({
  logoUrl,
  time,
  slug,
  playing,
  waiting,
  toggle,
  duration,
}) {
  // const [playerState, setPlayerState] = useAtom(playerAtom);

  return (
    <div className={styles.controls}>
      <Progress time={time} duration={duration} />
      <div className={styles.artworkDuration}>
        <Artwork logoUrl={logoUrl} slug={slug} />
      </div>
      <div className={styles.mainControls}>
        <PlayerButton
          onClick={toggle}
          id="playPauseBtn"
          playing={playing}
          type="playStop"
          icon={
            waiting ? <LoadingDots /> : playing ? <PauseIcon /> : <PlayIcon />
          }
        />
      </div>
      <div className={styles.sideControls}>{<VolumeControls />}</div>
    </div>
  );
}
