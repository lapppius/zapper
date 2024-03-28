import Link from "next/link";
import styles from "./table.module.scss";

export default function Table({ item }) {
  return (
    <table className={styles.table}>
      <tbody>
        {Object.entries(item).map(([key, value]) => (
          <tr key={key + value}>
            <th key={key}>{key}</th>
            <td>
              {typeof value === "object" ? (
                JSON.stringify(value)
              ) : value instanceof Date ? (
                value.toLocaleString()
              ) : typeof value === "string" && value.startsWith("http") ? (
                <Link href={value} target="_blank">
                  {value}
                </Link>
              ) : (
                value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
