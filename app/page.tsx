import Link from "next/link";

export default async function Home() {
  return (
    <>
      <nav className="flex gap-4">
        <Link href="/artists">Artists</Link>
        <Link href="/artworkTypes">Artwork Types</Link>
      </nav>
    </>
  );
}
