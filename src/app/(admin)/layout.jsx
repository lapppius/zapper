import styles from "./adminLayout.module.scss";
import AdminNav from "@/components/Admin/AdminNav";
import AdminMain from "@/components/Admin/AdminMain";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminLayout}>
      <AdminNav pathname={"admin"} />
      <AdminMain>{children}</AdminMain>
    </div>
  );
}
