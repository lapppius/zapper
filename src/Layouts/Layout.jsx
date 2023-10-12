import TopNavBar from '../components/TopNavBar';
import Player from '../components/Player/Player';
import { PlayerContext } from '../App';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
function Layout(props) {
    const { playing, curId } = useContext(PlayerContext).playerState;
    const location = useLocation();
    const show = window.location.pathname;
    return (
        <>
            <TopNavBar />
            <main>{props.children}</main>
            {show === '/' || playing || curId ? <Player /> : undefined}
        </>
    );
}

export default Layout;
