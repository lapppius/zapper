import styles from "./userLayout.module.scss";
export default function UserLayout({ children }) {
  return <main className={styles.userLayout}>{children}</main>;
}
