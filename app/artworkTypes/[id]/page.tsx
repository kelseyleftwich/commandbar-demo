import Artworks from "../../../components/Artworks";
import { Suspense } from "react";

export default async function ArtworkTypes({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Artworks query={{ artwork_type_id: params.id }} />
    </Suspense>
  );
}
