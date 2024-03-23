import styles from "./select.module.scss";

export default function Select({
	options,
	setSelected,
	defaultValue,
	variant,
}) {
	return (
		<select
			className={styles.select}
			onChange={(e) => {
				setSelected(e.target.value);
			}}
			style={{ width: variant === "constrained" ? "fit-content" : "100%" }}
		>
			{options.map((option, i) => (
				<option
					key={i}
					id={i}
					value={option.value}
					hidden={option.value == defaultValue}
				>
					{option.key}
				</option>
			))}
		</select>
	);
}
