import Link from "next/link";
import { Artwork } from "../types";
import Details from "./Details";

const Artwork = ({ art }: { art: Artwork & { imageUrl: string } }) => {
  return (
    <section className="grid grid-cols-1 gap-4 justify-items-center text-center ">
      <Details art={art} />
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