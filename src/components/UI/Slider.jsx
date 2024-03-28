import styles from "./slider.module.scss";

export default function Slider({... props }) {
  return <input type="range" {...props} className={styles.slider} />;
}
