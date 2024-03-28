import styles from "./volumeControls.module.scss";
import { useAtom } from "jotai";
import { playerAtom } from "../PlayerAtom";
import VolumeSlider from "./VolumeSlider";
import VolumeButton from "./VolumeButton";

export default function VolumeControls() {
  const { volume } = useAtom(playerAtom)[0];
  const [playerState, setPlayerState] = useAtom(playerAtom);

  const mute = () => {
    if (volume !== 0) {
      setPlayerState({ ...playerState, volume: 0 });
    } else {
      setPlayerState({ ...playerState, volume: 1 });
    }
  };

  const slider = (value) => {
    setPlayerState({ ...playerState, volume: value });
  };
  return (
    <div className={styles.volumeControls}>
      <VolumeButton mute={mute} volume={volume} />
      <VolumeSlider slider={slider} volume={volume} />
    </div>
  );
}
