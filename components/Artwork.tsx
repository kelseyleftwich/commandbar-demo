import Link from "next/link";
import { Artwork } from "./types";

const Artwork = ({ art }: { art: Artwork & { imageUrl: string } }) => {
  return (
    <section className="grid grid-cols-1 gap-4 justify-items-center text-center ">
      <h1 className="text-3xl mb-1">{art.title}</h1>
      <Link
        href={`/artists/${art.artist_id}`}
        className="text-rose-700 hover:text-rose-900"
      >
        <span>Artist</span>
        <h2 className="text-2xl mb-1">{art.artist_title}</h2>
      </Link>
      <Link
        href={`/artworkTypes/${art.artwork_type_id}`}
        className="text-rose-700 hover:text-rose-900"
      >
        <span>Artwork type</span>
        <h2 className="text-2xl mb-4">{art.artwork_type_title}</h2>
      </Link>
      <img
        key={art.id}
        src={art.imageUrl}
        alt={art.title}
        className="h-auto max-w-full rounded-lg"
      />
    </section>
  );
};

export default Artwork;
