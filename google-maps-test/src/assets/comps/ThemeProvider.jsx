"use client";
import { createContext, useState } from "react";
export const ThemeContext = createContext({});

export default function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
