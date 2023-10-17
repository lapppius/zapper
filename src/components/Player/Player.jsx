import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../App";
import { getWikidataEntityPromise } from "../../FetchFunctions";
import NowPlaying from "./NowPlaying";
import styles from "./Player.module.css";
import PlayerControls from "./PlayerControls";

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
    fetch("wikisource.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].wikiID == currentId) {
            getWikidataEntityPromise(res[i + 1].wikiID).then((res) => {
              resolve(res.claims.P963[0].mainsnak.datavalue.value);
            });
          }
        }
      });
  });
}

function setCurrentPlaying(id, audio, source, audioContext) {
  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  try {
    if (id === prevPlayingID && !audio.paused) return;

    audio.src = source;
    isM3U8Url(source)
      .then((isM3U8) => {
        if (isM3U8) {
          console.log("This is an M3U8 playlist URL.");
          console.log("maybe it's m3u8");
          // Create an audio buffer source node.
          const audioBufferSource = audioContext.createBufferSource(
            2,
            audioContext.sampleRate * 3.0,
            audioContext.sampleRate
          );

          // Load the audio data from the audio source.
          fetch(audio.src)
            .then((response) => response.arrayBuffer())
            .then((data) => audioContext.decodeAudioData(data))
            .then((buffer) => {
              audioBufferSource.buffer = buffer;
              audioBufferSource.connect(audioContext.destination);
              audioBufferSource.start();
            })
            .catch((error) => console.error(error));
        } else {
          console.log("This is not an M3U8 playlist URL.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
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

async function isM3U8Url(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const text = await response.text();
      return text.startsWith("#EXTM3U");
    } else {
      console.error(
        "Failed to fetch the URL:",
        response.status,
        response.statusText
      );
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}

function setMediaSession(
  radioName = undefined,
  imgSrc = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOJgAADiYBou8l/AAAAYlQTFRFAAAATk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTbFUJwAAAIN0Uk5TAOn/9CEY1vvmyZBIEWj4/qcrIu7kiiACXPzlnxdP4l5qfgevkdyLQl3gJ0H5oAbL9yV4mRv649/VyrLThEBFPIZgZrsJH7iTCN7AWOvxCr+qqTgS/TPv0gOAqy8FDC6s2uHwugF/cD8UvBojvh1XdRCIVtelTilpS0Mq7Chit3EOdH1EpSKOAAACbUlEQVR4nO3Y91vTQByA8XggbR1EEIjV4sCBdYDWal2oCEoRcSAqIC7cuBdOXH+5UJKSS9Im0RJyz/N+fuTuvpf3KS081TQAAAAAAAAAAAAAAAAAAAAAAAAAwP9ZIfzU1ZtbVzZ4b0gkU6tWr7EPXdvoO3WOvq4WAQEuajK3Nq+v8jAtrW2LQ40N6SAFG2MUMCexKbM4tj3Ia5CMV4AQm7eUxxpbVQwQYltHefB2JQPSOwxrcGan7+6YvQdKErvKr0Gn7+YYvgJCNO62JhspJQNEdo81eu8+JQP0/dborm4lA8SBg9bsnM/OOL6J5x2yZucPV994ZAkCCkddjuVDBmStA9rx0oCkvFzXYA4+cXIJAnqqbHUGnGqb13z6jOMTX++Vz52Vl/v6a/HctQiwfrW0c+flhQHVArTioLRwQbkAbUi3LwyqF5C5aF8YVi/gUsG+oBvSuUgDLl+xuzoSMOCa9FE5Kl8RaYBDa8CA69KfrBvKBRh90sJN1QLGxqUPITGhSMCtyZLbd+7Kzy9yigRk75Xcd/7bPzUiXxHbgEoejCkeMOS4QrWA1EO1A4bbnVcsZ8Cj8AEDhvOKSAMe99g9eRo2QH827boi0oAw/8x56X7uPqdSwIuXHufUCRidyHidUyag8Mr1/lUpoOX1mwrnIg142+vyrugXkJ56/+HjZMUrIg3woM9UCPj0ecGXmXxXtSuWO6DiV4tNVQcTQAABBBBAAAEBOL6T8qB/NbfWf5MXvge8YlY+9qPD/0gIP8f95H6ZW4uz0s9/B32Q6T/SuU7ntxYAAAAAAAAAAAAAAAAAAAAAAAAAgH/1F9k7nWhOWsIVAAAAAElFTkSuQmCC`,
  NowPlaying = undefined
) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: radioName,
      artist: NowPlaying,
      album: radioName,
      artwork: [
        {
          src: imgSrc,
          sizes: "192x192"
        },
      ],
    });
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
    curName,
    nowPlaying,
    curImg,
    radiosList,
  } = playerContext.playerState;

  useEffect(() => {
    initializeAudio(audioElement.current, audioContext, gainNode);
  }, [audioElement]);

  useEffect(() => {
    if (streamUrl !== undefined) {
      setCurrentPlaying(curId, audioElement.current, streamUrl, audioContext);
    }
  }, [streamUrl]);

  useEffect(() => {
    if (curName !== undefined && curImg !== null) {
      setMediaSession(curName, curImg, nowPlaying);
    }
  }, [curName, curImg, nowPlaying]);

  useEffect(() => {
    if (playing === true && streamUrl !== undefined) {
      setCurrentPlaying(curId, audioElement.current, streamUrl, audioContext);
    } else if (playing === false && streamUrl !== undefined) {
      audioElement.current.pause();
      // audioContext.suspend();
    }
  }, [playing]);

  useEffect(() => {
    if (curRef) {
      curRef.children[2].click();
      curRef.children[2].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
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
      id={styles["player"]}
      className="player"
      style={{
        background: `${
          color != null
            ? `rgba(${color.Vibrant.getRgb().join(",")},0.15)`
            : "transparent"
        }`,
      }}
    >
      <NowPlaying />
      <audio
        onCanPlay={() => playerContext.playerDispatch({ type: "SET_PLAY" })}
        onWaiting={() => playerContext.playerDispatch({ type: "SET_WAITING" })}
        onPause={() => playerContext.playerDispatch({ type: "SET_PAUSE" })}
        onTimeUpdate={(e) => {
          playerContext.playerDispatch({
            type: "TIMEUPDATE",
            payload: e.target.currentTime,
          });
        }}
        preload="none"
        id={styles["playerAudio"]}
        crossOrigin="anonymous"
        ref={audioElement}
      />
      <PlayerControls />
    </div>
  );
}
