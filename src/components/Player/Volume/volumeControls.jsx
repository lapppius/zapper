import styles from "./volumeControls.module.scss";
import { useAtom } from "jotai";
import { playerAtom } from "../PlayerAtom";
import VolumeSlider from "./VolumeSlider";
import VolumeButton from "./VolumeButton";

export default function VolumeControls() {
  const { volume, player } = useAtom(playerAtom)[0];
  const [playerState, setPlayerState] = useAtom(playerAtom);

  const mute = () => {
    if (volume !== 0) {
      setPlayerState({ ...playerState, volume: 0 });
      if (player) {
        player.volume = 0;
      }
    } else {
      setPlayerState({ ...playerState, volume: 1 });
      if (player) {
        player.volume = 1;
      }
    }
  };

  return (
    <div className={styles.volumeControls}>
      <VolumeButton mute={mute} volume={volume} />
      <VolumeSlider />
    </div>
  );
}
