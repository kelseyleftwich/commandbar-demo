import Artworks from "../../../components/Artworks";
import { Suspense } from "react";

export default async function Artists({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Artworks query={{ artist_id: params.id }} />
    </Suspense>
  );
}
