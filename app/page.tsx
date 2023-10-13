import Link from "next/link";
import Artworks from "../components/Artworks";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <nav className="flex gap-4">
        <Link href="/artists">Artists</Link>
        <Link href="/artworkTypes">Artwork Types</Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Artworks />
      </Suspense>
    </>
  );
}
