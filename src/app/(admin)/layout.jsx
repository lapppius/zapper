import styles from "./adminLayout.module.scss";
import AdminNav from "@/components/Admin/AdminNav";

export default function AdminLayout({ children }) {
	return (
		<div className={styles.adminLayout}>
			<AdminNav pathname={"admin"} />
			<main className={styles.adminMain}>{children}</main>
		</div>
	);
}
