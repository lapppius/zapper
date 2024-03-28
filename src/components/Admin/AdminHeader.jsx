import styles from "./adminHeader.module.scss";

export default function AdminHeader({ children }) {
  return <header className={styles.header}>{children}</header>;
}
