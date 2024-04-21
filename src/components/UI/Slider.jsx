import styles from "./slider.module.scss";

export default function Slider({ seekBarValue, ...props }) {
  return (
    <div className={styles.slider}>
      <input type="range" {...props} />
      <div
        style={{
          width: `${seekBarValue}%`,
        }}
        className={styles.slider__seekedBar}
      ></div>
    </div>
  );
}
