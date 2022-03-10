import { useContext } from 'react';
import { PlayerContext } from '../App';

export default function ShareButton(props) {
    const { isMobile } = useContext(PlayerContext).playerState;
    const Share = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: props.title,
                    text: `Άκουστε ${props.title}`,
                    url: window.location,
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    };
    return (
        <>{isMobile == true ? <button onClick={Share}>Share</button> : ''}</>
    );
}
