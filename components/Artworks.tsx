import { Artwork as ArtworkType } from "./types";
import Artwork from "./Artwork";
import Link from "next/link";

type Config = {
  iiif_url: string;
};

type SearchResponse = {
  data: ArtworkType[];
  config: Config;
};

type QueryResponse = {
  data: ArtworkType;
  config: Config;
};

const size = "/full/843,/0/default.jpg";

type Query = {
  artist_id?: string;
  id?: string;
  artwork_type_id?: string;
};

const fields: Readonly<(keyof ArtworkType)[]> = [
  "id",
  "title",
  "image_id",
  "artwork_type_id",
  "artist_title",
  "artwork_type_title",
  "artist_id",
  "artwork_type_id",
] as const;

async function loadArt(query?: Query) {
  if (query?.id) {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/${query.id}?query[term][is_public_domain]=true&fields=${fields}`
    );
    const resJson: QueryResponse = await res.json();
    const iiifUrl = resJson.config.iiif_url;

    return [
      {
        ...resJson.data,
        imageUrl: `${iiifUrl}/${resJson.data.image_id}${size}`,
      },
    ];
  }

  let elasticSearchQuery: any = {
    query: {
      bool: {
        must: [
          {
            term: {
              is_public_domain: true,
            },
          },
        ],
      },
    },
    limit: 12,
    fields: fields,
  };

  const baseUrl = "https://api.artic.edu/api/v1/artworks/search?";

  if (query?.artist_id) {
    elasticSearchQuery.query.bool.must.push({
      term: { ["artist_id"]: Number(query.artist_id) },
    });
  }

  if (query?.artwork_type_id) {
    elasticSearchQuery.query.bool.must.push({
      term: { ["artwork_type_id"]: Number(query.artwork_type_id) },
    });
  }

  const formattedQuery = encodeURIComponent(JSON.stringify(elasticSearchQuery));
  const urlToFetch = `${baseUrl}params=${formattedQuery}`;

  const res = await fetch(urlToFetch);

  const resJson: SearchResponse = await res.json();

  const iiifUrl = resJson.config.iiif_url;

  return resJson.data.map((artworkData) => {
    const imageUrl = `${iiifUrl}/${artworkData.image_id}${size}`;

    return {
      ...artworkData,
      imageUrl,
    };
  });
}

export default async function Artworks({
  query,
  display,
}: {
  query?: Query;
  display?: "artist" | "artworkType";
}) {
  const artworks = await loadArt(query);

  if (artworks.length === 0) {
    return <p>No results 😔</p>;
  }

  if (artworks.length === 1) {
    const art = artworks[0];
    return <Artwork art={art} />;
  }

  return (
    <>
      {query?.artwork_type_id && (
        <h1 className="text-3xl mb-1 text-rose-600">
          {artworks[0].artwork_type_title}
        </h1>
      )}
      {query?.artist_id && (
        <h1 className="text-3xl mb-1 text-rose-600">
          {artworks[0].artist_title}
        </h1>
      )}

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {artworks
          .filter((artwork) => !!artwork.imageUrl)
          .map((art) => (
            <Link href={`/${art.id}`} key={art.id} className="relative">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="h-auto max-w-full rounded-lg"
              />
              {!!display && (
                <div className="absolute top-0 left-0 right-0 p-2 bg-gray-800 bg-opacity-50 text-white">
                  {display === "artist" && art.artist_title}
                  {display === "artworkType" && art.artwork_type_title}
                </div>
              )}
            </Link>
          ))}
      </section>
    </>
  );
}
