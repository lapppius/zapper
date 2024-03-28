"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PlayPauseButton from "./PlayPauseButton";
import RadiosListItemPlayingAnimation from "./RadiosListItemPlayingAnimation";
import styles from "./radiosListItem.module.scss";
import Image from "next/image";
import { useAtom } from "jotai";
import { playerAtom } from "../Player/PlayerAtom";

export default function RadiosListItem({
  slug,
  id,
  title,
  streamURL,
  logoURL,
}) {
  // const { playing, curId } = useAtom(playerAtom)[0];
  const [playerState, setPlayerState] = useAtom(playerAtom);

  const router = useRouter();

  // const togglePlay = () => {
  //   if (curId == id) {
  //     console.log("curId == id", curId == id);
  //     if (playing) {
  //       setPlayerState({ ...playerState, playing: false });
  //     } else {
  //       setPlayerState({ ...playerState, playing: true });
  //     }
  //   }
  // };

  const setCurrent = (e) => {
    console.log("setcurrent called");
    // togglePlay();
    setPlayerState({
      ...playerState,
      streamUrl: streamURL,
      logoUrl: logoURL,
      slug: slug,
      curId: id,
    });
    e.stopPropagation();
  };

  return (
    <li
      tabIndex="0"
      title={title}
      className={styles.radiosListItem}
      key={id}
      id={id}
      onClick={(e) => {
        router.push(`radio/${slug}`);
        e.stopPropagation();
      }}
    >
      <div className={styles.imageButtonContainer}>
        {logoURL.startsWith("/") || logoURL.startsWith("http") ? (
          <Image alt={title} id={id} height="80" width="80" src={logoURL} />
        ) : null}
        <PlayPauseButton title={title} setCurrent={setCurrent} id={id} />
        <RadiosListItemPlayingAnimation id={id} />
      </div>
      <Link href={`/radio/${id != null ? slug : ""}`}>{title}</Link>
    </li>
  );
}
