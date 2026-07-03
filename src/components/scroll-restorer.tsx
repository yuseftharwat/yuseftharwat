"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollY");
    if (!saved) return;

    sessionStorage.removeItem("scrollY");
    const y = Number(saved);
    if (!y) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: "instant" });
    });
  }, []);

  return null;
}
