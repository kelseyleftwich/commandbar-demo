import Artworks from "../../../components/Artworks";
import { Suspense } from "react";

export default async function Artists({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <Artworks slug={params.slug} />
      </Suspense>
    </main>
  );
}
