import Link from "next/link";
import Artworks from "../components/Artworks";
import { Suspense } from "react";
import CommandBar from "@/providers/CommandBar";

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
      <CommandBar />
    </>
  );
}
