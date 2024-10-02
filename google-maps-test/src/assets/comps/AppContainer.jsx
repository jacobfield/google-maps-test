"use client";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function AppContainer({ children }) {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const themeStyles = darkTheme
    ? {
        backgroundColor: "#343a40",
        color: "#f8f9fa",
      }
    : {
        backgroundColor: "#f8f9fa",
        color: "#343a40",
      };

  return (
    <div
      className="AppContainer"
      style={{
        ...themeStyles,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="form">
        <input
          className="formInput"
          type="checkbox"
          onChange={() => setDarkTheme(!darkTheme)}
        />
        <label className="formLabel">Toggle Theme</label>
      </div>
      <hr />
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
