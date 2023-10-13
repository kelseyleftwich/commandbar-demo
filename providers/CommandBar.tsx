"use client";
import { useEffect } from "react";
import { init } from "commandbar";

if (typeof window !== "undefined") {
  init("5cc2a56d");
}

export default () => {
  useEffect(() => {
    window.CommandBar.boot("");

    return () => {
      window.CommandBar.shutdown();
    };
  }, []);

  return null;
};
