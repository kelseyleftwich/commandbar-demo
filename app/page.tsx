import Link from "next/link";

export default async function Home() {
  return (
    <>
      <nav className="flex gap-4 items-center">
        <Link
          href="/artists"
          className="px-4 py-2 text-sm  text-white bg-rose-600 rounded-md shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Browse Artists
        </Link>
        <Link
          href="/artworkTypes"
          className="px-4 py-2 text-sm  text-white bg-rose-600 rounded-md shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
        >
          Browse Artwork Types
        </Link>
      </nav>
    </>
  );
}
