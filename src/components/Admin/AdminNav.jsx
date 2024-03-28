import NavLink from "../UI/NavLink";
import MobileMenu from "../UI/MobileMenu";
import styles from "./adminNav.module.scss";

export default function AdminNav({ pathname }) {
  const options = [
    { key: "Home", value: "/" },
    { key: "Admin Home", value: `/${pathname}` },
    { key: "Radios", value: `/${pathname}/radios` },
    { key: "Genres", value: `/${pathname}/genres` },
    { key: "Users", value: `/${pathname}/users` },
  ];
  return (
    <aside className={styles.adminNav}>
      <nav>
        <ul>
          {options.map((option, i) => (
            <NavLink href={option.value} title={option.key} key={i} />
          ))}
        </ul>
        <MobileMenu options={options} />
      </nav>
    </aside>
  );
}
