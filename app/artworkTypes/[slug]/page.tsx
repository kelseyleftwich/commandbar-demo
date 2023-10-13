import Artworks from "../../../components/Artworks";
import { Suspense } from "react";

export default async function ArtworkTypes({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Artworks slug={params.slug} />
    </Suspense>
  );
}
