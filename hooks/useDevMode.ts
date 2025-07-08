"use client";

import { useEffect, useState } from "react";

export default function useDevMode() {
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDevMode = localStorage.getItem("dev-mode");
      setDevMode(savedDevMode === "true");
    }
  }, []);

  const toggleDevMode = () => {
    const newDevMode = !devMode;
    setDevMode(newDevMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("dev-mode", newDevMode.toString());
    }
  };

  return { devMode, toggleDevMode };
}
