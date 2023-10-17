"use client";
import { useEffect, useState } from "react";

const useDistractionFreeMode = () => {
  const [mode, setMode] = useState("default");

  useEffect(() => {
    const modeFromStorage = localStorage.getItem("mode");
    setMode(modeFromStorage || "default");
  }, []);

  useEffect(() => {
    if (window.CommandBar) {
      window.CommandBar.addCallback("useDistractionFreeMode", () => {
        window.localStorage.setItem("mode", "distraction-free");
        // in a real app, you'd probably want to use a provider so all components using the mode value can update
        window.location.reload();
      });

      window.CommandBar.addCallback("clearDistractionFreeMode", () => {
        window.localStorage.setItem("mode", "default");
        window.location.reload();
      });
    }
  }, []);

  return mode;
};

export default useDistractionFreeMode;
