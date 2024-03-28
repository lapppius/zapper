import Input from "../UI/Input";
import styles from "./searchBar.module.scss";

export default function SearchBar({ placeholder }) {
  return (
    <>
      <search className={styles.search}>
        <Input
          type="search"
          name="search"
          id="search"
          placeholder={placeholder}
        />
      </search>
    </>
  );
}
