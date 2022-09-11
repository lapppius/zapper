import Radios from './pages/Radios';
import { Radio } from './pages/Radio';
import About from './pages/About';
import Epg from './pages/Epg';
import NotFound from './pages/NotFound';
import Layout from './Layouts/Layout';
import { Route, Routes } from 'react-router-dom';
import {
    useMemo,
    useReducer,
    createContext,
    StrictMode,
    useEffect,
} from 'react';

export const PlayerContext = createContext();

const initialState = {
    curId: undefined,
    prevId: undefined,
    nextId: undefined,
    color: undefined,
    curName: undefined,
    nowPlaying: undefined,
    // curRef: undefined,
    curImg: undefined,
    streamUrl: undefined,
    prevStreamUrl: undefined,
    nextStreamUrl: undefined,
    playing: false,
    emptied: false,
    waiting: false,
    time: null,
    audioContext: null,
    gainNode: null,
    isMobile: false,
};
initialState.audioContext =
    new AudioContext() || window.AudioContext || window.webkitAudioContext;
initialState.gainNode = initialState.audioContext.createGain();
initialState.audioContext.suspend();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMPTIED':
            console.log('emptied');
            return { ...state, playing: undefined, nowPlaying: undefined };
        case 'SET_NAME':
            return { ...state, curName: action.payload };
        case 'SET_NOW_PLAYING':
            return { ...state, nowPlaying: action.payload };
        case 'SET_COLOR':
            return { ...state, color: action.payload };
        case 'SET_CUR_ID':
            return { ...state, curId: action.payload };
        // case 'SET_CUR_REF':
        //     return { ...state, curRef: action.payload };
        case 'SET_STREAM':
            return { ...state, streamUrl: action.payload };
        case 'TOGGLE_PLAY':
            console.log('toggle_play');
            if (state.playing === false && state.streamUrl) {
                return { ...state, playing: true };
            } else {
                return { ...state, playing: false };
            }
        case 'SET_PLAY':
            console.log('play');
            return { ...state, playing: true, waiting: false };
        case 'SET_WAITING':
            console.log('waiting');
            return { ...state, waiting: true };
        case 'SET_PAUSE':
            console.log('paused');
            return {
                ...state,
                playing: false,
                time: null,
                nowPlaying: undefined,
            };
        case 'TIMEUPDATE':
            return { ...state, time: action.payload };
        case 'SET_CUR_IMG':
            return { ...state, curImg: action.payload };
        case 'SET_NEXT_RADIO':
            return {
                ...state,
                nextStreamUrl: action.payload,
            };
        case 'SET_IS_MOBILE':
            if (state.isMobile !== action.payload) {
                return { ...state, isMobile: action.payload };
            } else {
                return { ...state };
            }

        default:
            return {
                ...state,
            };
    }
};

export default function App() {
    const [playerState, playerDispatch] = useReducer(reducer, initialState);
    const providerValue = useMemo(() => ({ playerState, playerDispatch }));

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            {
                entries[0].contentRect.width < 599
                    ? playerDispatch({
                          type: 'SET_IS_MOBILE',
                          payload: true,
                      })
                    : playerDispatch({
                          type: 'SET_IS_MOBILE',
                          payload: false,
                      });
            }
        });
        resizeObserver.observe(document.body);
    }, [document.body]);

    // const test1 = sessionStorage.getItem('test1');
    // if (test1 == null) {
    //     fetch('wikisource.json')
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((res) => {
    //             const wikiIDs = [];
    //             res.forEach((element) => {
    //                 const item = {
    //                     id: element.wikiID,
    //                 };
    //                 wikiIDs.push(item);
    //             });
    //             sessionStorage.setItem('test1', JSON.stringify(wikiIDs));
    //         });
    // }

    return (
        <StrictMode>
            <PlayerContext.Provider value={providerValue}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Radios />} />
                        <Route path="/radios" element={<Radios />} />
                        <Route path="/:short" element={<Radio />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/epg" element={<Epg />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </PlayerContext.Provider>
        </StrictMode>
    );
}
