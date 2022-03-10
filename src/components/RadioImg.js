import styles from './RadioImg.module.css';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../App';
import { Link } from 'react-router-dom';

const EL_WIKIPEDIA_API = 'https://el.wikipedia.org/w/api.php';
const MAX_CACHE_AGE = 900;

function setImagesListPromise(title) {
    return new Promise((resolve, reject) => {
        if (title) {
            try {
                fetch(
                    'https://el.wikipedia.org/api/rest_v1/page/media-list/' +
                        encodeURI(title)
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((elwiki_media) => {
                        const wikifileName =
                            elwiki_media.items[0].title.replace(/Αρχείο:/g, '');

                        fetch(
                            EL_WIKIPEDIA_API +
                                '?origin=*&action=query&format=json&smaxage=' +
                                MAX_CACHE_AGE +
                                '&maxage=' +
                                MAX_CACHE_AGE +
                                '&titles=File:' +
                                encodeURI(wikifileName) +
                                '&prop=imageinfo&iiprop=url&iiurlwidth=115'
                        )
                            .then((response) => response.json())
                            .then((res) => {
                                for (let p in res.query.pages) {
                                    return res.query.pages[p].imageinfo[0]
                                        .thumburl;
                                }
                            })
                            .then((url) => {
                                resolve(url);
                            });
                    });
            } catch (err) {
                console.log(err);
            }
        }
    });
}

export default function RadioImg(props) {
    const [loadedImgUrl, setImgUrl] = useState(null);
    const playerContext = useContext(PlayerContext);
    const { curId, curImg, playing } = playerContext.playerState;
    const radiosSession = sessionStorage.getItem('radiosListSes');

    useEffect(() => {
        if (radiosSession == null) {
        setImagesListPromise(props.title).then((res) => {
            setImgUrl(res);
            let previous = JSON.parse(
                sessionStorage.getItem('radiosListSes')
            );

            previous.forEach((element) => {
                if (element.id == props.id) {
                    element['imgUrl'] = res;
                    sessionStorage.setItem(
                        'radiosListSes',
                        JSON.stringify(previous)
                    );
                }
            });
        });
        } else {
        JSON.parse(radiosSession).forEach((element) => {
            if (element.id === props.id) {
                setImgUrl(element.imgUrl);
            }
        });
        }
    }, [props.id]);

    useEffect(() => {
        if (
            props.id === curId &&
            curImg !== loadedImgUrl
        ) {
            playerContext.playerDispatch({
                type: 'SET_CUR_IMG',
                payload: loadedImgUrl,
            });
        }
    }, [curId, loadedImgUrl]);

    return (
        <span className={`${styles[props.style]}`}>
           {loadedImgUrl? <img
                height={props.height}
                width={props.width}
                alt={'Λογότυπο - ' + props.title}
                src={loadedImgUrl}
                loading="lazy"
            />:''}
        </span>
    );
}
