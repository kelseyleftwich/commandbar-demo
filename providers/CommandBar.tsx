"use client";
import { useEffect } from "react";
import { init } from "commandbar";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  init("5cc2a56d");
}

export default () => {
  const router = useRouter();
  useEffect(() => {
    window.CommandBar.boot("");

    window.CommandBar.addRouter(router.push);

    return () => {
      window.CommandBar.shutdown();
    };
  }, [router]);

  return null;
};
