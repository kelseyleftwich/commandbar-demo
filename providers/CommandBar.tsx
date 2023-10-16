"use client";
import { useEffect } from "react";
import { init } from "commandbar";
import { useRouter } from "next/navigation";
import sortObjectsByBestMatch from "@/utils/sortByBestMatch";

if (typeof window !== "undefined") {
  init("5cc2a56d");
}

type Response = {
  data: {
    id: number;
    title: string;
  }[];
  config: {
    iiif_url: string;
  };
};

const onSearchArtists = async (query: string) => {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artists/search?query[match][title]=${query}&fields=title,id`
  );

  const resJson: Response = await res.json();

  return resJson.data;
};

// API does not have search endpoint for artwork types so we query all and then sort
const onSearchArtworkTypes = async (query: string) => {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artwork-types?fields=title,id`
  );

  const resJson: Response = await res.json();
  return sortObjectsByBestMatch(resJson.data, "title", query);
};

export default () => {
  const router = useRouter();
  useEffect(() => {
    window.CommandBar.boot("");

    window.CommandBar.setFormFactor({
      type: "inline",
      rootElement: document.getElementById("commandbar-inline-root") ?? "",
    });

    window.CommandBar.addRouter(router.push);

    window.CommandBar.addRecords("artists", [], {
      onInputChange: onSearchArtists,
      labelKey: "title",
    });

    window.CommandBar.addRecords("artworkTypes", [], {
      onInputChange: onSearchArtworkTypes,
      labelKey: "title",
      searchableFields: ["title"],
    });

    return () => {
      window.CommandBar.shutdown();
    };
  }, [router]);

  return null;
};
