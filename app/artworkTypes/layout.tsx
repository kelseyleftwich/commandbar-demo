import Link from "next/link";

export default function ArtworkTypesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/artworkTypes" className="text-3xl text-rose-700">
        Artwork Types
      </Link>

      {children}
    </>
  );
}
