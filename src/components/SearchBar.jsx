"use client";
import { useState } from "react";
import styles from "./searchBar.module.scss";
import MagnifyingGlass from "@/components/UI/Icons/MagnifyingGlass";
import XIcon from "@/components/UI/Icons/XIcon";

export default function SearchBar({ placeholder, action }) {
  const [inputValue, setInputValue] = useState("");
  const searchAction = action.bind(null, inputValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
  };

  return (
    <>
      <form className={styles.search} action={searchAction}>
        <button type="submit" title="Search Radio, Podcast & more">
          <MagnifyingGlass />
        </button>
        <input
          autoComplete="off"
          type="search"
          name="search"
          id="search"
          placeholder={placeholder}
          value={inputValue}
          required
          spellCheck="false"
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        {inputValue.length > 0 ? (
          <button
            title="Clear"
            type="reset"
            onClick={() => {
              handleReset();
            }}
          >
            <XIcon />
          </button>
        ) : null}
      </form>
    </>
  );
}
