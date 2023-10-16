import styles from "./RadioImg.module.css";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../App";
import * as Vibrant from "node-vibrant";

const EL_WIKIPEDIA_API = "https://el.wikipedia.org/w/api.php";
const MAX_CACHE_AGE = 86400;

function setImagesListPromise(title) {
  return new Promise((resolve, reject) => {
    if (title) {
      try {
        fetch(
          "https://el.wikipedia.org/api/rest_v1/page/media-list/" +
            encodeURI(title)
        )
          .then((response) => {
            return response.json();
          })
          .then((elwiki_media) => {
            let wikifileName = undefined;
            if (elwiki_media.items && elwiki_media.items.length > 0) {
              wikifileName = elwiki_media.items[0].title.replace(
                /Αρχείο:/g,
                ""
              );
            }
            fetch(
              EL_WIKIPEDIA_API +
                "?origin=*&action=query&format=json&smaxage=" +
                MAX_CACHE_AGE +
                "&maxage=" +
                MAX_CACHE_AGE +
                "&titles=File:" +
                encodeURI(wikifileName) +
                "&prop=imageinfo&iiprop=url&iiurlwidth=120"
            )
              .then((response) => response.json())
              .then((res) => {
                for (let p in res.query.pages) {
                  if (
                    res &&
                    res.query &&
                    res.query.pages &&
                    res.query.pages[p] &&
                    res.query.pages[p].imageinfo &&
                    res.query.pages[p].imageinfo[0]
                  ) {
                    return res.query.pages[p].imageinfo[0].thumburl;
                  } else {
                    // Handle the case where one of the properties or elements is undefined
                    return undefined; // or some other default value or error handling logic
                  }
                }
              })
              .then((url) => {
                resolve(url);
              });
          });
      } catch (err) {
        console.log(err.message);
      }
    }
  });
}

export default function RadioImg(props) {
  const [loadedImgUrl, setImgUrl] = useState(undefined);
  const playerContext = useContext(PlayerContext);
  const { curId, curImg } = playerContext.playerState;
  const radiosSession = sessionStorage.getItem("radiosListSes");
  useEffect(() => {
    setImagesListPromise(props.title).then((res) => {
      console.log(setImgUrl(res));
    });
  }, [props]);

  // useEffect(() => {
  // if (radiosSession == undefined) {
  //   setImagesListPromise(props.title).then((res) => {
  //     setImgUrl(res);
  //     let previous = JSON.parse(sessionStorage.getItem("radiosListSes"));
  //     if (previous != null) {
  //       previous.forEach((element) => {
  //         if (element.id == props.id) {
  //           element["imgUrl"] = res;
  //           sessionStorage.setItem("radiosListSes", JSON.stringify(previous));
  //         }
  //       });
  //     }
  //   });
  // } else {
  // JSON.parse(radiosSession).forEach((element) => {
  //   if (element.id === props.id) {
  // setImgUrl(element.imgUrl);
  //   }
  // });
  // }
  // }, [props.id, , props.title]);

  useEffect(() => {
    if (props.id === curId && curImg !== loadedImgUrl) {
      playerContext.playerDispatch({
        type: "SET_CUR_IMG",
        payload: loadedImgUrl,
      });
    }
  }, [curId, loadedImgUrl, curImg, playerContext, props.id]);

  useEffect(() => {
    if (loadedImgUrl !== undefined) {
      Vibrant.from(loadedImgUrl)
        .getPalette()
        .then((palette) => {
          if (props.setImgPalette) props.setImgPalette(palette);
        });
    }
  }, [loadedImgUrl]);
  return (
    <span
      className={`${styles[props.style]}`}
      style={{
        border: `4px solid ${
          props.style == "radioLogoContainer" && props.borderColor
            ? `rgba(${props.borderColor},0.7)`
            : "0"
        }`,
      }}
    >
      {loadedImgUrl ? (
        <img
          height={props.height}
          width={props.width}
          alt={"Λογότυπο - " + props.title}
          src={loadedImgUrl}
          loading="lazy"
        />
      ) : (
        ""
      )}
    </span>
  );
}
