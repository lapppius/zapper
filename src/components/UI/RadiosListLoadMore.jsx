"use client";
import { useEffect, useState } from "react";
import RadiosListItem from "./RadiosListItem";
import { fetchRadios } from "../../app/radios/actions";
import styles from "./RadiosListLoadMore.module.css";
import { useInView } from "react-intersection-observer";

export default function RadiosListLoadMore({ radios }) {
  const [radiosList, setRadiosList] = useState(Object.entries(radios.radios));
  const [next, setNext] = useState(radios.next);

  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  async function loadMore() {
    const moreRadios = await fetchRadios(
      null,
      5,
      "next",
      radiosList[radiosList.length - 1][1]?.radioName
    );

    const more = Object.entries(moreRadios.radios);
    setNext(moreRadios.next);

    setRadiosList((prevRadiosList) => [...prevRadiosList, ...more]);
    console.log(radiosList);
  }

  useEffect(() => {
    console.log(inView, next);
    if (next && inView == true) {
      loadMore();
    }
  });
  return (
    <>
      <ul className={styles.radiosListLoadMore}>
        {radiosList.map(([key, radio]) => (
          <RadiosListItem
            key={key}
            id={radio.id}
            title={radio.radioName}
            streamUrl={radio.streamURL}
            logoURL={radio.logoURL}
            slug={radio.slug}
          />
        ))}
      </ul>
      {next ? (
        <div ref={ref} className="flex justify-center">
          <svg
            className="w-5 h-5 m-3 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : null}
    </>
  );
}
