"use client";

import {
  isDocumentDarkTheme,
  isSystemDarkTheme,
  toggleDarkTheme
} from "@/utils/theme";
import { useCallback, useState } from "react";

export type ThemeString = "dark" | "light";

function useToggleTheme(defaultValue?: ThemeString) {
  const [current, setTheme] = useState<ThemeString>(
    defaultValue ?? isSystemDarkTheme() ? "dark" : "light"
  );

  const toggle = useCallback((next?: ThemeString) => {
    const isNextDark = (next && next === "dark") ?? !isDocumentDarkTheme();
    toggleDarkTheme(isNextDark);
    setTheme(isNextDark ? "dark" : "light");
  }, []);

  return [current, toggle] as const;
}

export default useToggleTheme;
