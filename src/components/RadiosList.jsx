import RadiosListItem from './RadiosListItem';
import styles from './RadiosList.module.css';

export default function RadiosList(props) {
    return (
        <ul className={styles.radiosList}>
            {props.radios.map((radio) => (
                <RadiosListItem
                    key={radio.id}
                    id={radio.id}
                    title={radio.title}
                    streamUrl={radio.streamUrl}
                />
            ))}
        </ul>
    );
}