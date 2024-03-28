import styles from "./form.module.scss";
import SubmitButton from "../UI/SubmitButton";

export default function Form({ action, children, submitTitle }) {
  return (
    <form action={action} className={styles.form}>
      {children}
      <SubmitButton title={submitTitle} />
    </form>
  );
}
