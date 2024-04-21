"use client";
import { useMemo } from "react";
import ListItem from "./ListItem";
import Image from "next/image";
import styles from "./list.module.scss";

export default function List({ data }) {
  const countriesList = useMemo(() => {
    return data;
  }, [data]);

  return (
    <ul className={styles.list}>
      {countriesList.map((country) => (
        <ListItem country={country} key={country.numeric}>
          <div className="relative h-[40px] w-[40px] rounded-full overflow-hidden">
            <Image
              src={`/flags/png/${country.alpha2Code.toLowerCase()}.png`}
              alt={`Flag of ${country.enName}`}
              fill
              sizes="(max-width: 350px) 20px,(max-width: 768px) 40px"
              style={{
                objectFit: "cover",
              }}
              loading="lazy"
            />
          </div>
        </ListItem>
      ))}
    </ul>
  );
}
