import _ from "lodash";
import { Artwork as ArtworkType } from "./types";
import Artwork from "./Artwork";

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

const fields =
  "id,title,image_id,artwork_type_id,artist_title,artwork_type_title,artist_id,artwork_type_id";

async function loadArt(query?: Query) {
  if (query?.id) {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/${query.id}?fields=${fields}`
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

  let urlToFetch = "https://api.artic.edu/api/v1/artworks/search?";
  if (query?.artist_id) {
    urlToFetch += `query[term][artist_id]=${query.artist_id}&`;
  }

  if (query?.artwork_type_id) {
    urlToFetch += `query[term][artwork_type_id]=${query.artwork_type_id}&`;
  }

  const res = await fetch(`${urlToFetch}limit=12&fields=${fields}`);

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
  const artworkGroups = _.chunk(artworks, 3);

  if (artworks.length === 1) {
    const art = artworks[0];
    return <Artwork art={art} />;
  }

  return (
    <>
      {query?.artwork_type_id && (
        <h1 className="text-3xl mb-1">{artworks[0].artwork_type_title}</h1>
      )}
      {query?.artist_id && (
        <h1 className="text-3xl mb-1">{artworks[0].artist_title}</h1>
      )}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {artworkGroups.map((artworkGroup, index) => (
          <div key={index} className="grid gap-4">
            {artworkGroup
              .filter((artwork) => !!artwork.imageUrl)
              .map((art) => (
                <a href={`/${art.id}`} key={art.id} className="relative">
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
                </a>
              ))}
          </div>
        ))}
      </section>
    </>
  );
}
