import RadiosListItem from "./RadiosListItem";
import styles from "./radiosList.module.scss";

export default function RadiosList(props) {
  return (
    <ul className={styles.radiosList}>
      {props.radios
        ? Object.entries(props.radios).map(([key, radio]) => (
            <RadiosListItem
              key={key}
              id={radio.id}
              title={radio.name}
              streamURL={radio.stream}
              logoURL={radio.logo}
              slug={radio.slug}
            />
          ))
        : null}
    </ul>
  );
}
