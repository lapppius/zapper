"use client";
import { useState } from "react";
import Button from "@/components/UI/Button";
import DownArrowIcon from "@/components/UI/Icons/DownArrowIcon";
import dynamic from "next/dynamic";
const Table = dynamic(() => import("../UI/Table"), {
  loading: () => <p>Loading</p>,
});

export default function AdminListItemInfo({ item }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <Button onClick={() => setShowAll(!showAll)} icon={<DownArrowIcon />} />
      {showAll ? <Table item={item} /> : null}
    </>
  );
}
