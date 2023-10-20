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
  const [imgPalette, setImgPalette] = useState(null);
  const [wikiSummary, setWikiSummary] = useState({
    wikiSum: { sumContent: null, isWiki: null },
  });
  const wikiSummaryRef = useRef(null);
  const imgRef = useRef(undefined);

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
    });
  }, [wikiSummaryRef, props.title]);
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
            : `linear-gradient(192deg, #6e6e6e, #171717)`
        } `,
        // background: `${
        //   imgPalette != null
        //     ? `linear-gradient(185deg, rgba(${imgPalette.LightVibrant.getRgb().join(
        //         ","
        //       )},1) 0%,rgba(${imgPalette.Vibrant.getRgb().join(",")},1) 50%
        //                   ,rgba(${imgPalette.DarkVibrant.getRgb().join(
        //                     ","
        //                   )},1) 100%)`
        //     : `linear-gradient(250deg, #6e6e6e, #171717)`
        // } `,
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
          innerRef={imgRef}
          title={props.title}
          id={props.id}
          url={undefined}
          height="180px"
          width="180px"
          style="radioLogoContainer"
          borderColor={
            imgPalette != null
              ? imgPalette.LightVibrant.getRgb().join(",")
              : "black"
          }
          setImgPalette={setImgPalette}
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
