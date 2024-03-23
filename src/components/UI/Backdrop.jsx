import styles from "./backdrop.module.scss";

export default function Backdrop({ children, onClick }) {
	return (
		<div className={styles.backdrop} onClick={onClick}>
			{children}
		</div>
	);
}
