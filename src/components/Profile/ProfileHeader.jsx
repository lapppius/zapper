import Image from "next/image";
import styles from "./profileHeader.module.scss";

export default function ProfileHeader({ session }) {
  return (
    <header className={styles.header}>
      <div className={styles.header__imageNameDateContainer}>
        <div className={styles.header__imageContainer}>
          <Image
            src={session?.user.image}
            alt={`${session?.user.name} profile picture`}
            width={120}
            height={120}
          />
        </div>
        <div>
          <h1>{session?.user.name}</h1>
          <h2 className="">
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "medium",
            }).format(new Date(session?.user.createdAt))}
          </h2>
        </div>
      </div>
    </header>
  );
}
