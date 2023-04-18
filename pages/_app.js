import "@/styles/globals.css";
import React, { useState } from "react";
import {
  ThemeProvider,
  LightTheme,
  DarkTheme,
} from "../components/ThemeSwitcher/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;

  return (
    <>
      <NavBar />
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <div style={currentTheme}>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default App;
