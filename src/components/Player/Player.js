import styles from './Player.module.css';
import NowPlaying from './NowPlaying';
import PlayerControls from './PlayerControls';
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../App';
import { getWikidataEntityPromise } from '../../FetchFunctions';

// let audioContext = null;
let playPromise = undefined;

function initializeAudio(audioEl, audioContext, gainNode) {
    // pass audio element into the audio context
    const stream = audioContext.createMediaElementSource(audioEl);
    // const gainNode = audioContext.createGain();

    stream.connect(gainNode).connect(audioContext.destination);
}
let prevItem = undefined;
let prevPlayingID = undefined;

function fetchNext(currentId) {
    return new Promise((resolve, reject) => {
        fetch('wikisource.json')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].wikiID == currentId) {
                        getWikidataEntityPromise(res[i + 1].wikiID).then(
                            (res) => {
                                resolve(
                                    res.claims.P963[0].mainsnak.datavalue.value
                                );
                            }
                        );
                    }
                }
            });
    });
}

function setCurrentPlaying(id, audio, source, audioContext) {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    try {
        if (id === prevPlayingID && !audio.paused) return;

        audio.src = source;
        audio.load();
        playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then((res) => {}).catch((error) => {});
        }
        prevPlayingID = id;
    } catch (error) {
        console.log(error);
    }
}

export default function Player() {
    const audioElement = useRef(null);
    const playerContext = useContext(PlayerContext);
    const {
        color,
        playing,
        streamUrl,
        audioContext,
        gainNode,
        curId,
        curRef,
        radiosList,
    } = playerContext.playerState;
    useEffect(() => {
        initializeAudio(audioElement.current, audioContext, gainNode);
    }, [audioElement]);

    useEffect(() => {
        if (streamUrl !== undefined) {
            setCurrentPlaying(
                curId,
                audioElement.current,
                streamUrl,
                audioContext
            );
        }
    }, [streamUrl]);

    useEffect(() => {
        if (playing === true && streamUrl !== undefined) {
            setCurrentPlaying(
                curId,
                audioElement.current,
                streamUrl,
                audioContext
            );
        } else if (playing === false && streamUrl !== undefined) {
            audioElement.current.pause();
            // audioContext.suspend();
        }
    }, [playing]);

    useEffect(() => {
        if (curRef) {
            curRef.children[2].click();
            curRef.children[2].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }, [curRef, radiosList]);

    // useEffect(() => {
    //     fetchNext(curId).then((res) => {
    //         playerContext.playerDispatch({
    //             type: 'SET_NEXT_RADIO',
    //             payload: res,
    //         });
    //     });
    // }, [curId]);

    return (
        <div
            id={styles['player']}
            className="player"
            style={{
                background: `${
                    color != null
                        ? `rgba(${color.DarkVibrant.getRgb().join(
                              ','
                          )},0.2)`
                        : 'transparent'
                }`,

            }}
        >
            <NowPlaying />
            <audio
                onCanPlay={() =>
                    playerContext.playerDispatch({ type: 'SET_PLAY' })
                }
                onWaiting={() =>
                    playerContext.playerDispatch({ type: 'SET_WAITING' })
                }
                onPause={() =>
                    playerContext.playerDispatch({ type: 'SET_PAUSE' })
                }
                onTimeUpdate={(e) => {
                    playerContext.playerDispatch({
                        type: 'TIMEUPDATE',
                        payload: e.target.currentTime,
                    });
                }}
                preload="none"
                id={styles['playerAudio']}
                crossOrigin="anonymous"
                ref={audioElement}
            />
            <PlayerControls />
        </div>
    );
}
