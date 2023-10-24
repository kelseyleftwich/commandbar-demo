import Link from "next/link";
import { Artwork } from "../types";
import Image from "next/image";
import Details from "./Details";

const Artwork = ({ art }: { art: Artwork & { imageUrl: string } }) => {
  console.log(art.imageUrl);
  return (
    <section className="grid grid-cols-1 gap-4 justify-items-center text-center ">
      <Details art={art} />
      <Image
        key={art.id}
        src={art.imageUrl}
        width={1500}
        height={1500}
        alt={art.title}
        className="h-auto max-w-full rounded-lg"
      />
    </section>
  );
};

export default Artwork;
