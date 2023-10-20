import styles from "./RadioHeader.module.css";
import PlayPauseButton from "../PlayPauseButton";
import ShareButton from "../ShareButton";
import RadioImg from "../RadioImg";
import * as Vibrant from "node-vibrant";
import { useEffect, useRef, useState, useContext } from "react";
import { fetchWikiSummary, setImagesListPromise } from "../../FetchFunctions";
import { PlayerContext } from "../../App";
import { Typography, Skeleton } from "@mui/material";
import React from "react";

export default function RadioHeader(props) {
  const playerContext = useContext(PlayerContext);
  const { curId, curImg } = playerContext.playerState;

  const [imgPalette, setImgPalette] = useState(null);
  const [loadedImgUrl, setImgUrl] = useState(undefined);

  const [wikiSummary, setWikiSummary] = useState({
    wikiSum: { sumContent: null, isWiki: null },
  });
  const wikiSummaryRef = useRef(null);

  useEffect(() => {
    if (props.id === curId && curImg !== loadedImgUrl) {
      playerContext.playerDispatch({
        type: "SET_CUR_IMG",
        payload: loadedImgUrl,
      });
    }
  }, [curId, loadedImgUrl, curImg, props.id]);

  useEffect(() => {
    if (loadedImgUrl !== undefined && loadedImgUrl != null) {
      Vibrant.from(loadedImgUrl)
        .getPalette()
        .then((palette) => {
          if (setImgPalette) setImgPalette(palette);
        });
    }
  }, [loadedImgUrl]);

  useEffect(() => {
    fetchWikiSummary(props.title).then((res) => {
      {
        res.extract == undefined
          ? setWikiSummary((prevState) => ({
              ...prevState,
              wikiSum: {
                ...prevState.wikiSum,
                sumContent: props.description,
                isWiki: false,
              },
            }))
          : setWikiSummary((prevState) => ({
              ...prevState,
              wikiSum: {
                ...prevState.wikiSum,
                sumContent: res.extract,
                isWiki: true,
              },
            }));
      }
    });
  }, [wikiSummaryRef, props.title]);

  useEffect(() => {
    if (props.title) {
      setImagesListPromise(props.title)
        .then((res) => {
          setImgUrl(res);
        })
        .catch((err) => {
          setImgUrl(
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOJgAADiYBou8l/AAAAYlQTFRFAAAATk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTbFUJwAAAIN0Uk5TAOn/9CEY1vvmyZBIEWj4/qcrIu7kiiACXPzlnxdP4l5qfgevkdyLQl3gJ0H5oAbL9yV4mRv649/VyrLThEBFPIZgZrsJH7iTCN7AWOvxCr+qqTgS/TPv0gOAqy8FDC6s2uHwugF/cD8UvBojvh1XdRCIVtelTilpS0Mq7Chit3EOdH1EpSKOAAACbUlEQVR4nO3Y91vTQByA8XggbR1EEIjV4sCBdYDWal2oCEoRcSAqIC7cuBdOXH+5UJKSS9Im0RJyz/N+fuTuvpf3KS081TQAAAAAAAAAAAAAAAAAAAAAAAAAwP9ZIfzU1ZtbVzZ4b0gkU6tWr7EPXdvoO3WOvq4WAQEuajK3Nq+v8jAtrW2LQ40N6SAFG2MUMCexKbM4tj3Ia5CMV4AQm7eUxxpbVQwQYltHefB2JQPSOwxrcGan7+6YvQdKErvKr0Gn7+YYvgJCNO62JhspJQNEdo81eu8+JQP0/dborm4lA8SBg9bsnM/OOL6J5x2yZucPV994ZAkCCkddjuVDBmStA9rx0oCkvFzXYA4+cXIJAnqqbHUGnGqb13z6jOMTX++Vz52Vl/v6a/HctQiwfrW0c+flhQHVArTioLRwQbkAbUi3LwyqF5C5aF8YVi/gUsG+oBvSuUgDLl+xuzoSMOCa9FE5Kl8RaYBDa8CA69KfrBvKBRh90sJN1QLGxqUPITGhSMCtyZLbd+7Kzy9yigRk75Xcd/7bPzUiXxHbgEoejCkeMOS4QrWA1EO1A4bbnVcsZ8Cj8AEDhvOKSAMe99g9eRo2QH827boi0oAw/8x56X7uPqdSwIuXHufUCRidyHidUyag8Mr1/lUpoOX1mwrnIg142+vyrugXkJ56/+HjZMUrIg3woM9UCPj0ecGXmXxXtSuWO6DiV4tNVQcTQAABBBBAAAEBOL6T8qB/NbfWf5MXvge8YlY+9qPD/0gIP8f95H6ZW4uz0s9/B32Q6T/SuU7ntxYAAAAAAAAAAAAAAAAAAAAAAAAAgH/1F9k7nWhOWsIVAAAAAElFTkSuQmCC"
          );
        });
    }
  }, [props.title]);

  return (
    <section
      className={styles.radioHeaderContainer}
      style={{
        background: `${
          imgPalette != null
            ? `linear-gradient(185deg, rgba(${imgPalette.LightVibrant.getRgb().join(
                ","
              )},1) 0%,rgba(${imgPalette.Vibrant.getRgb().join(",")},1) 50%
                          ,rgba(${imgPalette.DarkVibrant.getRgb().join(
                            ","
                          )},1) 100%)`
            : `linear-gradient(250deg, #6e6e6e, #171717)`
        } `,
      }}
    >
      <header>
        <div className={styles.headerText}>
          <h1>
            {!props.title ? (
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  variant: "rounded",
                  height: "2rem",
                  width: "13rem",
                  animation: "wave",
                }}
              />
            ) : (
              props.title
            )}
          </h1>
        </div>

        <RadioImg
          title={props.title}
          id={props.id}
          src={loadedImgUrl}
          height="180px"
          width="180px"
          style="radioLogoContainer"
          borderColor={
            imgPalette != null
              ? imgPalette.LightVibrant.getRgb().join(",")
              : "black"
          }
        />
        <div className={styles.headerButtons}>
          <PlayPauseButton
            style="radioPlayButton"
            id={props.id}
            streamUrl={props.streamUrl}
            title={props.title}
          />
          <ShareButton {...props} />
        </div>
        <p className={styles.radioDescription} ref={wikiSummaryRef}>
          {wikiSummary.wikiSum.sumContent ? (
            wikiSummary.wikiSum.sumContent
          ) : (
            <React.Fragment>
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  variant: "rounded",
                  height: "1.5rem",
                  width: "22rem",
                  animation: "wave",
                }}
              />
              <Skeleton
                sx={{
                  bgcolor: "grey.900",
                  variant: "rounded",
                  height: "1.5rem",
                  width: "13rem",
                  animation: "wave",
                }}
              />
            </React.Fragment>
          )}
          {wikiSummary.wikiSum.isWiki == undefined ? (
            ""
          ) : wikiSummary.wikiSum.isWiki ? (
            <span>
              <a
                target="_blank"
                title={`Λήμμα της Βικιπαίδειας για ${props.title}`}
                href={`https://el.wikipedia.org/wiki/${encodeURI(props.title)}`}
              >
                Βικιπαίδεια
              </a>
            </span>
          ) : (
            <span>
              <a
                target="_blank"
                title={`Λήμμα της Βικιπαίδειας για ${props.title}`}
                href={`https://wikidata.org/wiki/${encodeURI(props.id)}`}
              >
                Wikidata
              </a>
            </span>
          )}
        </p>
      </header>
    </section>
  );
}
