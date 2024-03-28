import styles from "./input.module.scss";

export default function Input({ ...props }) {
  return (
    <div className={styles.input}>
      <label htmlFor={props.name}>
        {props.label}
        {props.required ? "*" : ""}
      </label>
      <input
        {...props}
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
}
