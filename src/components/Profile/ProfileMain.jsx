import styles from "./profileMain.module.scss";

export default function ProfileMain({ session }) {
  return (
    <main className={styles.main}>
      <div>{session?.user.email}</div>
      <details>
        <summary>{session?.user.role}</summary>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </details>
    </main>
  );
}
