import { useContext, useEffect, useRef, useState } from 'react';
import { PlayerContext } from '../../App';
import styles from './CurrentTime.module.css';

function formatSecondsAsTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);

    if (hr < 10) {
        hr = '0' + hr;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    if (hr < 1) {
        return min + ':' + sec;
    } else {
        return hr + ':' + min + ':' + sec;
    }
}

export default function CurrentTime() {
    const curTimeElRef = useRef();
    let [nowTime, setNowTime] = useState('00:00');

    const {time} = useContext(PlayerContext).playerState;

    useEffect(() => {
        setNowTime(formatSecondsAsTime(time));
    }, [time,curTimeElRef]);

    return <span ref={curTimeElRef} id={styles['curTime']}>{nowTime}</span>;
}
