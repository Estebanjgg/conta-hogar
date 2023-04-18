import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const LightTheme = {
  backgroundColor: "#fff",
  color: "#020303",
};

export const DarkTheme = {
  backgroundColor: "#020303",
  color: "#fff",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const currentTheme = theme === "light" ? LightTheme : DarkTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={currentTheme}>{children}</div>
    </ThemeContext.Provider>
  );
};
