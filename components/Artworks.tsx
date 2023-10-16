import _ from "lodash";

type SearchResponse = {
  data: {
    id: number;
    title: string;
    image_id: string;
  }[];
  config: {
    iiif_url: string;
  };
};

type QueryResponse = {
  data: {
    id: number;
    title: string;
    image_id: string;
  };
  config: {
    iiif_url: string;
  };
};

const size = "/full/843,/0/default.jpg";

type Query = {
  artist_id?: string;
  id?: string;
  artwork_type_id?: string;
};

async function loadArt(query?: Query) {
  if (query?.id) {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/${query.id}?fields=id,title,image_id,artwork_type_id`
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

  if (query?.artwork_type_id) {
    urlToFetch += `query[term][id]=${query.artwork_type_id}&`;
  }

  const res = await fetch(
    `${urlToFetch}limit=12&fields=id,title,image_id,artwork_type_id`
  );

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

export default async function Artworks({ query }: { query?: Query }) {
  const artworks = await loadArt(query);
  const artworkGroups = _.chunk(artworks, 3);

  if (artworks.length === 1) {
    const art = artworks[0];
    return (
      <section className="grid grid-cols-1 gap-4 justify-items-center ">
        <h1 className="text-3xl mb-4">{art.title}</h1>
        <img
          key={art.id}
          src={art.imageUrl}
          alt={art.title}
          className="h-auto max-w-full rounded-lg"
        />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artworkGroups.map((artworkGroup, index) => (
        <div key={index} className="grid gap-4">
          {artworkGroup
            .filter((artwork) => !!artwork.imageUrl)
            .map((art) => (
              <a href={`/${art.id}`} key={art.id}>
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="h-auto max-w-full rounded-lg"
                />
              </a>
            ))}
        </div>
      ))}
    </section>
  );
}
