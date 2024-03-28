import styles from "./volumeSlider.module.scss";
import Slider from "../../UI/Slider";

export default function VolumeSlider({ slider, volume }) {
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
            slider(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
