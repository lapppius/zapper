"use client";
import { useEffect, useRef, useState } from "react";
// import NowPlaying from "./NowPlaying";
import styles from "./player.module.scss";
import PlayerControls from "./PlayerControls";
import { useAtom } from "jotai";
import { playerAtom } from "./PlayerAtom";
import { DevTools } from "jotai-devtools";
import shaka from "shaka-player";

export default function Player() {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useAtom(playerAtom);
  const { streamUrl, logoUrl, slug, playing, waiting, volume } =
    useAtom(playerAtom)[0];
  const audioRef = useRef(null);

  const initPlayer = async () => {
    const player = new shaka.Player();
    player.configure({
      streaming: {
        retryParameters: {
          maxAttempts: 3,
        },
      },
    });
    await player.attach(audioRef.current);
    setPlayer(player);
    console.log("init player");
  };

  const loadStream = async (streamUrl) => {
    try {
      await player.load(streamUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const toggle = () => {
    console.log("toggled");
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    initPlayer();
  }, []);

  useEffect(() => {
    if (player && streamUrl) {
      loadStream(streamUrl);
    }
  }, [streamUrl, player]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <>
      <DevTools position="left-right" theme="dark" />
      <div className={`${styles.player}`}>
        <div className="max-w-[var(--wide-width)] w-full">
          {/* <NowPlaying /> */}

          <audio
            crossOrigin="anonymous"
            ref={audioRef}
            onTimeUpdate={(e) => {
              setTime(e.target.currentTime);
              setDuration(e.target.duration);
            }}
            onPause={() => {
              console.log("onpause");
              setPlayerState({
                ...playerState,
                playing: false,
              });
            }}
            onPlay={() => {
              setPlayerState({ ...playerState, playing: true });
            }}
            onCanPlay={() => {
              console.log(
                "onCanPlay (can play the media, not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.)"
              );
              setPlayerState({ ...playerState, playing: true, waiting: false });
              audioRef.current.play();
            }}
            onCanPlayThrough={() => {
              console.log(
                "onCanPlayThrough (enough data has been loaded to play the media up to its end without having to stop for further buffering of content.)"
              );
            }}
            onWaiting={() => {
              console.log(
                "onWaiting (is fired when playback has stopped because of a temporary lack of data)"
              );
              setPlayerState({ ...playerState, playing: false, waiting: true });
            }}
            onAbort={() => {
              console.log("onAbort");
            }}
            onEmptied={() => {
              console.log("onEmptied");
            }}
            onSeeked={() => {
              console.log("onSeeked");
            }}
            onSeeking={() => {
              console.log("onSeeking");
            }}
            onLoadedData={() => {
              console.log("onloadedData");
            }}
            onDurationChange={() => {
              console.log("onDurationChange");
            }}
            onLoadedMetadata={(e) => {
              console.log("onloadedMetadata", e);
            }}
            onProgress={(e) => {
              setProgress(
                e.target.buffered.length ? e.target.buffered.end(0) : 0
              );
            }}
            onLoad={(e) => {
              console.log("onLoad", e);
            }}
            onVolumeChange={(e) => {
              console.log("onVolumeChange", e.target.volume);
              setPlayerState({ ...playerState, volume: e.target.volume });
            }}
            controls
          />
          <PlayerControls
            time={time}
            progress={progress}
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
