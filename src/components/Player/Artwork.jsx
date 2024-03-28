import Link from "next/link";
import Image from "next/image";
import styles from "./playerControls.module.scss";

export default function Artwork({ logoUrl, slug }) {
  return (
    <>
      {logoUrl ? (
        <Link href={`/radio/${slug}`}>
          <div className={styles.artwork}>
            {logoUrl ? (
              <Image src={logoUrl} alt={logoUrl} height="50" width="50" />
            ) : (
              ""
            )}
          </div>
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
