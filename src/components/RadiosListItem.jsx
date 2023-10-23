import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PlayerContext } from "../App";
import { idToShort, setImagesListPromise } from "../FetchFunctions";
import PlayingBars from "./Animations/EqualizerIcon";
import PlayPauseButton from "./PlayPauseButton";
import RadioImg from "./RadioImg";
import styles from "./RadiosListItem.module.css";

export default function RadiosListItem(props) {
  const playerContext = useContext(PlayerContext);
  const { playing, waiting, curId, time, curImg } = playerContext.playerState;
  const liRef = useRef(null);
  const [shortUrl, setShortUrl] = useState(null);
  const [loadedImgUrl, setImgUrl] = useState(undefined);

  useEffect(() => {
    idToShort(props.id).then((res) => {
      setShortUrl(res);
    });
  }, [props.id]);

  useEffect(() => {
    props.title
      ? setImagesListPromise(props.title)
          .then((res) => {
            setImgUrl(res);
          })
          .catch((err) => {})
      : undefined;
  }, [props.title]);

  useEffect(() => {
    if (props.id === curId && curImg !== loadedImgUrl) {
      playerContext.playerDispatch({
        type: "SET_CUR_IMG",
        payload: loadedImgUrl,
      });
    }
  }, [curId, loadedImgUrl, curImg, props.id]);
  return (
    <li
      tabIndex="0"
      ref={liRef}
      title={props.title}
      className={`${styles.radiosListItem} ${
        playing && curId === props.id ? `${styles.selected}` : ""
      }`}
      key={props.id}
      id={props.id}
    >
      <div className={styles.imageButtonContainer}>
        <RadioImg
          title={props.title}
          id={props.id}
          height="50px"
          width="50px"
          src={loadedImgUrl}
          style={"listImageContainer"}
        />
        <span className={waiting && props.id === curId ? styles.active : ""}>
          <PlayPauseButton
            id={props.id}
            streamUrl={props.streamUrl}
            title={props.title}
          />
        </span>
      </div>

      <Link to={`/${shortUrl != null ? shortUrl : ""}`}>
        <p className={styles}>{props.title}</p>
      </Link>
      {playing && !waiting && time !== null && curId === props.id ? (
        <span className={styles.equalizerWrapper}>
          <PlayingBars />
        </span>
      ) : null}
    </li>
  );
}
