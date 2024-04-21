import RadiosListItem from "./RadiosListItem";
import styles from "./radiosList.module.scss";

export default function RadiosList(props) {
  return (
    <div className={styles.radiosList}>
      <h1>{props.listTitle}</h1>
      <ul>
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
    </div>
  );
}
