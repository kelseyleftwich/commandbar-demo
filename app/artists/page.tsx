import Artworks from "@/components/Artworks";

export default async function Artists() {
  return (
    <>
      <h4>Featured Artists</h4>
      <Artworks display="artist" />
    </>
  );
}
