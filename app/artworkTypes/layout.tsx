import Link from "next/link";

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

      {children}
    </>
  );
}
