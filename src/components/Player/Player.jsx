"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// import NowPlaying from "./NowPlaying";
import styles from "./player.module.scss";
import PlayerControls from "./PlayerControls";
import { useAtom } from "jotai";
import { playerAtom } from "./PlayerAtom";
// import { DevTools } from "jotai-devtools";
import { getMimeType, getExtensionFromURL } from "./utils/getMIMEtype";
import { getDuration } from "./utils/getDuration";

const dashjs = dynamic(() => import("dashjs"));

export default function Player() {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useAtom(playerAtom);
  const { streamUrl, logoUrl, slug, playing, waiting, player } =
    useAtom(playerAtom)[0];
  const audioRef = useRef(null);

  const initPlayer = async () => {
    const player = audioRef.current;
    // setPlayer(player);
    setPlayerState({ ...playerState, player: player });
    console.log("init player");
  };

  const loadStreamIndirectly = async (streamUrl) => {
    const extension = await getExtensionFromURL(streamUrl);
    console.info("Detected extension :", extension);
    if (extension == null) {
      const mimeType = await getMimeType(streamUrl);
      console.info("Detected MIME type:", mimeType);
    }

    if (extension) {
      initializeDashjs(audioRef.current, streamUrl);
    }
  };

  const loadStream = async (streamUrl) => {
    try {
      try {
        player.src = streamUrl;
        player.load();
        player.play();
      } catch (error) {
        await loadStreamIndirectly(streamUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const initializeDashjs = (audio, streamUrl) => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(audio, streamUrl, true);
  };

  const toggle = () => {
    if (!streamUrl) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    initPlayer();
    return () => {
      setPlayerState({ ...playerState, player: null });
    };
  }, []);

  useEffect(() => {
    if (player && streamUrl) {
      loadStream(streamUrl);
    }
  }, [streamUrl]);

  return (
    <>
      {/* <DevTools position="left-right" theme="dark" /> */}
      <div className={`${styles.player}`}>
        <div className="max-w-[var(--wide-width)] w-full">
          {/* <NowPlaying /> */}

          <audio
            crossOrigin="anonymous"
            ref={audioRef}
            onTimeUpdate={(e) => {
              setDuration(getDuration(e.target));
              setTime(e.target.currentTime);
            }}
            onError={() => {
              setPlayerState({
                ...playerState,
                playing: false,
                waiting: false,
              });
              loadStreamIndirectly(streamUrl);
            }}
            onPause={() => {
              console.info("onpause");
              setPlayerState({
                ...playerState,
                playing: false,
              });
            }}
            onPlay={() => {
              setPlayerState({ ...playerState, playing: true });
            }}
            onCanPlay={() => {
              console.info(
                "onCanPlay"
                // " (can play the media, not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.)"
              );
              audioRef.current.play();
            }}
            onCanPlayThrough={() => {
              console.info(
                "onCanPlayThrough"
                // "(enough data has been loaded to play the media up to its end without having to stop for further buffering of content.)"
              );
            }}
            onPlaying={() => {
              setPlayerState({ ...playerState, playing: true, waiting: false });
              console.info(
                "onPlaying (is fired after playback is first started, and whenever it is restarted. For example it is fired when playback resumes after having been paused or delayed due to lack of data)"
              );
            }}
            onWaiting={() => {
              console.info(
                "onWaiting"
                // "(is fired when playback has stopped because of a temporary lack of data)"
              );
              setPlayerState({ ...playerState, waiting: true });
            }}
            onAbort={() => {
              console.info("onAbort");
            }}
            onEmptied={() => {
              console.info("onEmptied");
            }}
            onSeeked={() => {
              console.info(
                "onSeeked ( is fired when a seek operation completed, the current playback position has changed)"
              );
            }}
            onSuspend={() => {
              console.info(
                "onSuspend (is fired when media data loading has been suspended)"
              );
            }}
            onSeeking={() => {
              console.info("onSeeking");
            }}
            onLoadStart={() => {
              console.info("onLoadStart");
            }}
            onLoadedData={() => {
              console.info("onloadedData");
            }}
            onDurationChange={() => {
              console.info("onDurationChange");
            }}
            onLoadedMetadata={(e) => {
              console.info("onloadedMetadata", e);
            }}
            onProgress={(e) => {
              console.info("onProgress");

              setPlayerState({
                ...playerState,
                buffered: e.target.buffered.end(e.target.buffered.length - 1),
              });
            }}
            onLoad={(e) => {
              console.info("onLoad", e);
            }}
            onVolumeChange={(e) => {
              console.info("onVolumeChange", e.target.volume);
            }}
            // controls
          />
          <PlayerControls
            time={time}
            duration={duration}
            logoUrl={logoUrl}
            slug={slug}
            playing={playing}
            waiting={waiting}
            toggle={toggle}
          />
        </div>
      </div>
    </>
  );
}
