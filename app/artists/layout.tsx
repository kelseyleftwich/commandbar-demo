import Link from "next/link";

export default function ArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/artists" className="text-3xl text-rose-700">
        Artists
      </Link>

      {children}
    </>
  );
}
