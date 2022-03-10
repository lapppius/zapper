import styles from './RadioMain.module.css';
import PlayPauseButton from '../PlayPauseButton';
import ShareButton from '../ShareButton';
import RadioImg from '../RadioImg';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { fetchWikiSummary } from '../../FetchFunctions';

export default function RadioMain(props) {
    const [wikiSummary, setWikiSummary] = useState(null);
    const wikiSummaryRef = useRef(null);
    useEffect(() => {
        fetchWikiSummary(props.title).then((res) => {
            setWikiSummary(res.extract);
        });
    }, [wikiSummaryRef, props.title]);

    return (
        <section className={styles.radioMainContainer}>
            <header>
                <div className={styles.headerText}>
                    <h1>{props.title}</h1>
                </div>
                <RadioImg
                    title={props.title}
                    id={props.id}
                    url={undefined}
                    height="120px"
                    width="120px"
                    style="radioLogoContainer"
                />
                <div className={styles.headerButtons}>
                    <PlayPauseButton
                        style="radioPlayButton"
                        id={props.id}
                        streamUrl={props.streamUrl}
                    />
                    <ShareButton {...props} />
                </div>
                <p className={styles.radioDescription} ref={wikiSummaryRef}>
                    {wikiSummary}
                    {wikiSummary ? (
                        <span>
                            <a
                                target="_blank"
                                title={`Λήμμα της Βικιπαίδειας για ${props.title}`}
                                href={`https://el.wikipedia.org/wiki/${encodeURI(
                                    props.title
                                )}`}
                            >
                                Βικιπαίδεια
                            </a>
                        </span>
                    ) : (
                        <span>Loading wiki summary</span>
                    )}
                </p>
            </header>
        </section>
    );
}
