import { useState, useEffect } from "react";
import styles from "./volumeSlider.module.scss";
import Slider from "../../UI/Slider";
import { useAtom } from "jotai";
import { playerAtom } from "../PlayerAtom";

export default function VolumeSlider() {
  const { volume, player } = useAtom(playerAtom)[0];
  const [vol, setVol] = useState(0.5);
  const [playerState, setPlayerState] = useAtom(playerAtom);

  useEffect(() => {
    if (player) {
      player.volume = vol;
    }
  }, [vol, player]);

  return (
    <div className={styles.volumeSliderOuterContainer}>
      <div className={styles.volumeSliderContainer}>
        <Slider
          title={`Ένταση ήχου ${Math.floor(volume * 100)}%`}
          min="0"
          max="1"
          value={volume}
          step="0.01"
          onChange={(e) => {
            setVol(e.target.value);
            setPlayerState({ ...playerState, volume: e.target.value });
          }}
          seekBarValue={volume * 100}
        />
      </div>
    </div>
  );
}
