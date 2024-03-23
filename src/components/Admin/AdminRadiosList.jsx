import styles from "./adminRadiosList.module.scss";
import AdminRadiosListItem from "./AdminRadiosListItem";
// import Pagination from "@/components/UI/Pagination";

export default function AdminRadiosList({ adminRadios, cursor }) {
	// const cursor = adminRadios[adminRadios.length - 1].id;
	return (
		<>
			<ul className={styles.adminRadiosList}>
				{adminRadios
					? adminRadios.map((radio, i) => (
							<AdminRadiosListItem key={i} radio={radio} />
					  ))
					: null}
			</ul>
			{cursor}
			{/* <Pagination adminRadios={adminRadios} cursor={cursor} /> */}
		</>
	);
}
