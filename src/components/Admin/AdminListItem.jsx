"use client";
import Image from "next/image";
import styles from "./adminListItem.module.scss";
import AdminListItemInfo from "./AdminListItemInfo";
import AdminEditItem from "./AdminEditItem";

export default function AdminListItem({ item, editAction }) {
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
      <div className={styles.linkWrapper}>
        {/* <Link href={`/radio/${item.slug}`} target="_blank"> */}
        {item.name}
        {/* </Link> */}
      </div>
      <AdminEditItem item={item} action={editAction} />
      {/* 
      <AdminDeleteRadio radio={radio} />
    */}
      <div>test</div>
      <AdminListItemInfo item={item} />
    </li>
  );
}
