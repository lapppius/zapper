import styles from "./adminMain.module.scss";

export default function AdminMain({ children }) {
  return <main className={styles.adminMain}>{children}</main>;
}
