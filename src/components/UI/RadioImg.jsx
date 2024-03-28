import styles from "./RadioImg.module.scss";
import Image from "next/image";

export default function RadioImg(props) {
	return (
		<span className={`${styles[props.style]}`}>
			{props.src ? (
				<Image
					loading="lazy"
					height={props.height}
					width={props.width}
					alt={props.title ? "Λογότυπο - " + props.title : ""}
					src={props?.src}
				/>
			) : null}
		</span>
	);
}
