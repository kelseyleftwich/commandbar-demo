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

async function getArtists() {
  const res = await fetch(
    "https://api.artic.edu/api/v1/artists?page=2&limit=5&fields=title,id"
  );

  const resJson: Response = await res.json();
  return resJson.data;
}

export async function ArtistsNav() {
  const artists = await getArtists();

  return (
    <nav className="flex flex-wrap gap-4">
      {artists.map((artist) => (
        <Link
          key={artist.id}
          href={`/artists/${encodeURIComponent(artist.title)}`}
          className="px-4 py-2 rounded-lg border bg-gray-200 text-gray-800 border-gray-200"
        >
          {artist.title}
        </Link>
      ))}
    </nav>
  );
}

export default function ArtistsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/artists" className="text-3xl">
        Artists
      </Link>
      <ArtistsNav />

      {children}
    </>
  );
}
