"use client";

import Link from "next/link";
import { Artwork } from "../types";
import { useEffect, useState } from "react";

const Details = ({ art }: { art: Artwork & { imageUrl: string } }) => {
  const [mode, setMode] = useState("default");
  useEffect(() => {
    setMode(localStorage.getItem("mode") || "default");
  }, []);

  if (mode === "distraction-free") {
    return null;
  }

  return (
    <>
      <h1 className="text-3xl mb-1">{art.title}</h1>
      {art.artist_id && (
        <Link
          href={`/artists/${art.artist_id}`}
          className="text-rose-700 hover:text-rose-900"
        >
          <span>Artist</span>
          <h2 className="text-2xl mb-1">{art.artist_title}</h2>
        </Link>
      )}
      {art.artwork_type_id && (
        <Link
          href={`/artworkTypes/${art.artwork_type_id}`}
          className="text-rose-700 hover:text-rose-900"
        >
          <span>Artwork type</span>
          <h2 className="text-2xl mb-4">{art.artwork_type_title}</h2>
        </Link>
      )}
    </>
  );
};

export default Details;
