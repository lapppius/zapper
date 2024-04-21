import styles from "./publicLayout.module.scss";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <div className={styles.layout}>{children}</div>
      <Footer />
    </>
  );
}
