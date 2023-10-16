const getArtworkTypes = async (): Promise<{ id: number; title: string }[]> => {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artwork-types?fields=title,id`
  );
  const resJson = await res.json();

  return resJson.data;
};

export default async function ArtworkTypes() {
  const artworkTypes = await getArtworkTypes();

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {artworkTypes
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((type) => (
          <a
            key={type.id}
            className="px-4 py-2 text-sm  text-white bg-rose-600 rounded-md shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            href={`/artworkTypes/${type.id}`}
          >
            {type.title}
          </a>
        ))}
    </section>
  );
}
