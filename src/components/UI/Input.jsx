import styles from "./input.module.scss";

export default function Input({ ...props }) {
	return (
		<div className={styles.input}>
			<input {...props} />
			<label for={props.name}>{props.name}</label>
		</div>
	);
}
