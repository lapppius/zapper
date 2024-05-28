"use client";
import Image from "next/image";
import styles from "./adminListItem.module.scss";
import AdminListItemInfo from "./AdminListItemInfo";
import AdminEditItem from "./AdminEditItem";
import AdminDeleteItem from "./AdminDeleteItem";

export default function AdminListItem({
  item,
  editAction,
  deleteAction,
  children,
}) {
  return (
    <li key={item.slug} id={item.id} className={styles.adminListItem}>
      <div className={styles.imageContainer}>
        {item.logo || item.image ? (
          <Image
            alt={item.name}
            src={item.logo || item.image}
            width={60}
            height={60}
          />
        ) : null}
      </div>
      <div className={styles.linkWrapper}>{item.name}</div>
      {editAction != null ? (
        <AdminEditItem item={item} action={editAction} />
      ) : null}
      {deleteAction ? (
        <AdminDeleteItem item={item} action={deleteAction} />
      ) : null}

      <AdminListItemInfo item={item} />
      {children}
    </li>
  );
}
