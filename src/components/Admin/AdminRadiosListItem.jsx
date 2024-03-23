import Link from "next/link";
import AdminEditRadio from "../Admin/AdminEditRadio";
import AdminDeleteRadio from "./AdminDeleteRadio";
import AdminRadiosListItemInfo from "./AdminRadiosListItemInfo";
import RadioImg from "@/components/UI/RadioImg";
import styles from "./adminRadiosListItem.module.scss";

export default function AdminRadiosListItem({ radio }) {
	return (
		<li key={radio.slug} id={radio.id} className={styles.adminRadiosListItem}>
			<div className={styles.imageContainer}>
				<RadioImg
					src={radio?.logo}
					width={60}
					height={60}
					style={"listImageContainer"}
				/>
			</div>
			<Link href={`/radio/${radio.slug}`} target="_blank">
				{radio.name}
			</Link>
			<AdminEditRadio radio={radio} />
			<AdminDeleteRadio radio={radio} />
			<AdminRadiosListItemInfo radio={radio} />
		</li>
	);
}
