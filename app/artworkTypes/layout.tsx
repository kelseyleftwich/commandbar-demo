import Link from "next/link";

type Response = {
  data: {
    id: number;
    title: string;
  }[];
  config: {
    iiif_url: string;
  };
};

async function getArtworkTypes() {
  const res = await fetch(
    "https://api.artic.edu/api/v1/artwork-types?limit=5&fields=title,id"
  );

  const resJson: Response = await res.json();
  return resJson.data;
}

export async function ArtistsNav() {
  const artworkTypes = await getArtworkTypes();

  return (
    <nav className="flex flex-wrap gap-4">
      {artworkTypes.map((artworkType) => (
        <Link
          key={artworkType.id}
          href={`/artworkTypes/${encodeURIComponent(artworkType.title)}`}
          className="px-4 py-2 rounded-lg border bg-gray-200 text-gray-800 border-gray-200"
        >
          {artworkType.title}
        </Link>
      ))}
    </nav>
  );
}

export default function ArtworkTypesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/artworkTypes" className="text-3xl">
        Artwork Types
      </Link>
      <ArtistsNav />

      {children}
    </>
  );
}
