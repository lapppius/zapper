import styles from "./playerButton.module.css";

export default function PlayerButton({ id, title, ariaLabel, onClick, icon }) {
  return (
    <button
      id={styles[id]}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
