"use client";

import Link from "next/link";
import useDistractionFreeMode from "../../utils/useDistractionFreeMode";

export default function Header() {
  const mode = useDistractionFreeMode();

  if (mode === "distraction-free") {
    return null;
  }

  return (
    <>
      <Link href="/" className="text-4xl text-rose-800 mt-24">
        {"Sample The Art Institute of Chicago's API"}
      </Link>
    </>
  );
}
