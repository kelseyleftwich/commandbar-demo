import _ from "lodash";

type Response = {
  data: {
    id: number;
    title: string;
    image_id: string;
  }[];
  config: {
    iiif_url: string;
  };
};

const size = "/full/843,/0/default.jpg";

async function loadArt({ query }: { query?: string }) {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${query}&limit=12&fields=id,title,image_id`
  );

  const resJson: Response = await res.json();

  const iiifUrl = resJson.config.iiif_url;
  return resJson.data.map((artworkData) => {
    const imageUrl = `${iiifUrl}/${artworkData.image_id}${size}`;

    return {
      ...artworkData,
      imageUrl,
    };
  });
}

export default async function Artworks({ slug }: { slug?: string }) {
  const artworks = await loadArt({ query: slug });
  const artworkGroups = _.chunk(artworks, 3);

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artworkGroups.map((artworkGroup, index) => (
        <div key={index} className="grid gap-4">
          {artworkGroup
            .filter((artwork) => !!artwork.imageUrl)
            .map((art) => (
              <img
                key={art.id}
                src={art.imageUrl}
                alt={art.title}
                className="h-auto max-w-full rounded-lg"
              />
            ))}
        </div>
      ))}
    </section>
  );
}
