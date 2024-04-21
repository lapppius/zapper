import styles from "./adminList.module.scss";
import AdminListItem from "./AdminListItem";

export default function AdminList({ data, editAction, deleteAction }) {
  return (
    <ul className={styles.adminList}>
      {data.map((item, i) => (
        <AdminListItem
          item={item}
          key={i}
          editAction={editAction}
          deleteAction={deleteAction}
        />
      ))}
    </ul>
  );
}
