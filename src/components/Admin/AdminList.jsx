import styles from "./adminList.module.scss";
import AdminListItem from "./AdminListItem";

export default function AdminList({ data, editAction }) {
  return (
    <ul className={styles.adminList}>
      {data.map((item, i) => (
        <AdminListItem item={item} key={i} editAction={editAction} />
      ))}
    </ul>
  );
}
