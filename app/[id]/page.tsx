import Artworks from "../../components/Artworks";
import { Suspense } from "react";

export default async function Piece({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Artworks query={{ id: params.id }} />
    </Suspense>
  );
}
