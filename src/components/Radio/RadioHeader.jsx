import styles from './RadioHeader.module.css';
import PlayPauseButton from '../PlayPauseButton';
import ShareButton from '../ShareButton';
import RadioImg from '../RadioImg';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { fetchWikiSummary } from '../../FetchFunctions';

export default function RadioHeader(props) {
    const [imgPalette, setImgPalette] = useState(null);
    const [wikiSummary, setWikiSummary] = useState({
        wikiSum: { sumContent: null, isWiki: null },
    });
    const wikiSummaryRef = useRef(null);
    useEffect(() => {
        fetchWikiSummary(props.title).then((res) => {
            {
                res.extract == undefined
                    ? setWikiSummary((prevState) => ({
                          ...prevState,
                          wikiSum: {
                              ...prevState.wikiSum,
                              sumContent: props.description,
                              isWiki: false,
                          },
                      }))
                    : setWikiSummary((prevState) => ({
                          ...prevState,
                          wikiSum: {
                              ...prevState.wikiSum,
                              sumContent: res.extract,
                              isWiki: true,
                          },
                      }));
            }
        });
    }, [wikiSummaryRef, props.title]);
    return (
        <section
            className={styles.radioHeaderContainer}
            style={{
                background: `${
                    imgPalette != null
                        ? `linear-gradient(185deg, rgba(${imgPalette.LightVibrant.getRgb().join(
                              ','
                          )},1) 0%,rgba(${imgPalette.Vibrant.getRgb().join(
                              ','
                          )},1) 50%
                          ,rgba(${imgPalette.DarkVibrant.getRgb().join(
                              ','
                          )},1) 100%)`
                        : `linear-gradient(192deg, #6e6e6e, #171717)`
                } `,
            }}
        >
            <header>
                <div className={styles.headerText}>
                    <h1>{props.title}</h1>
                </div>
                <RadioImg
                    title={props.title}
                    id={props.id}
                    url={undefined}
                    height="180px"
                    width="180px"
                    style="radioLogoContainer"
                    borderColor={
                        imgPalette != null
                            ? imgPalette.LightVibrant.getRgb().join(',')
                            : 'black'
                    }
                    setImgPalette={setImgPalette}
                />
                <div className={styles.headerButtons}>
                    <PlayPauseButton
                        style="radioPlayButton"
                        id={props.id}
                        streamUrl={props.streamUrl}
                        title={props.title}
                    />
                    <ShareButton {...props} />
                </div>
                <p className={styles.radioDescription} ref={wikiSummaryRef}>
                    {wikiSummary.wikiSum.sumContent}
                    {wikiSummary.wikiSum.isWiki==undefined?'':wikiSummary.wikiSum.isWiki ? (
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
                        <span>
                            <a
                                target="_blank"
                                title={`Λήμμα της Βικιπαίδειας για ${props.title}`}
                                href={`https://wikidata.org/wiki/${encodeURI(
                                    props.id
                                )}`}
                            >
                                Wikidata
                            </a>
                        </span>
                    )}
                </p>
            </header>
        </section>
    );
}
