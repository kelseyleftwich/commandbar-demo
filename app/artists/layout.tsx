import Link from "next/link";

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

      {children}
    </>
  );
}
