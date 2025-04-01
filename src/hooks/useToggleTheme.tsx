"use client";

import { isDocumentDarkTheme, toggleDarkTheme } from "@/utils/theme";
import { useCallback } from "react";

function useToggleTheme() {
  const toggle = useCallback(() => {
    const isNextDark = !isDocumentDarkTheme();
    toggleDarkTheme(isNextDark);
  }, []);

  return toggle;
}

export default useToggleTheme;
