import styles from "./footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <Link href="#">Terms Of Use</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">GDPR</Link>
      </ul>
      <small>&copy; Zapper Music 2023 - {new Date().getFullYear()}</small>
    </footer>
  );
}
