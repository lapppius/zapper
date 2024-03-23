import styles from "./button.module.scss";
import LoadingIcon from "../UI/Icons/LoadingIcon";

export default function Button({ title, icon, onClick, loading, ...props }) {
	return (
		<button
			className={icon ? styles.button : styles.nonIcon}
			onClick={onClick}
			{...props}
		>
			{loading ? <LoadingIcon /> : ""}
			{icon ? icon : title}
		</button>
	);
}
