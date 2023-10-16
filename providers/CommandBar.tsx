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

type ArtistResponse = {
  data: {
    id: number;
    title: string;
    birth_date: number;
  }[];
  config: {
    iiif_url: string;
  };
};

const getExtraHtml = (domain: string, channel: string) =>
  `<div style="display: grid; grid-template-columns: auto auto; gap: 1rem; font-size: 13px; align-items: center; padding-bottom: 0.5rem;">
  <div>${domain}</div>
  <div style="
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 10px;
  border: 1px solid rgb(189, 189, 189);
  ">${channel}</div>
  </div>
  `;

const onSearchArtists = async (query: string) => {
  let elasticSearchQuery: any = {
    query: {
      match: {
        title: query,
      },
    },
    limit: 12,
    fields: ["title", "id", "birth_date"],
  };

  const baseUrl = "https://api.artic.edu/api/v1/artists/search?";
  const formattedQuery = encodeURIComponent(JSON.stringify(elasticSearchQuery));
  const urlToFetch = `${baseUrl}params=${formattedQuery}`;

  const res = await fetch(urlToFetch);

  const resJson: ArtistResponse = await res.json();

  return resJson.data.map((artist) => ({
    ...artist,
    __extraHTML: getExtraHtml(artist.title, artist.birth_date.toString()),
  }));
};

// API does not have search endpoint for artwork types so we query all and then sort
const onSearchArtworkTypes = async (query: string) => {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artwork-types?query[term][is_public_domain]=true&fields=title,id&limit=100`
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
