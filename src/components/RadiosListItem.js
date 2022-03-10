import styles from './RadiosListItem.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import PlayPauseButton from './PlayPauseButton';
import { PlayerContext } from '../App';
import { Link } from 'react-router-dom';
import RadioImg from './RadioImg';
import PlayingBars from './Animations/EqualizerIcon';

const idToShort = (id) => {
    return new Promise((resolve, reject) => {
        fetch('wikisource.json')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                for (const item of res) {
                    if (item.wikiID === id) {
                        resolve(encodeURI(item.name.replaceAll(' ', '_')));
                    }
                }
            });
    });
};

export default function RadiosListItem(props) {
    const playerContext = useContext(PlayerContext);
    const { playing, waiting, curId } = playerContext.playerState;
    const liRef = useRef(null);
    const [shortUrl, setShortUrl] = useState(null);

    useEffect(() => {
        idToShort(props.id).then((res) => {
            setShortUrl(res);
        });
    }, []);

    return (
        <li
            tabIndex="0"
            ref={liRef}
            title={props.title}
            className={`${styles.radiosListItem} ${
                playing && curId === props.id ? `${styles.selected}` : ''
            }`}
            key={props.id}
            id={props.id}
        >
            <div className={styles.imageButtonContainer}>
                <RadioImg
                    title={props.title}
                    id={props.id}
                    height="70px"
                    width="70px"
                    style={'listImageContainer'}
                />
                <span
                    className={
                        waiting && props.id === curId ? styles.active : ''
                    }
                >
                    <PlayPauseButton
                        id={props.id}
                        streamUrl={props.streamUrl}
                        title={props.title}
                    />
                </span>
            </div>
            {}

            <Link to={`/${shortUrl != null ? shortUrl : ''}`}>
                <p>{props.title}</p>
            </Link>
            <span
                style={{
                    opacity: `${
                        playing && !waiting && curId === props.id ? '1' : '0'
                    }`,
                }}
                className={styles.equalizerWrapper}
            >
                <PlayingBars />
            </span>
        </li>
    );
}
