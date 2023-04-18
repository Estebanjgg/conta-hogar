import React from "react";
import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className={`${styles.button} ${theme === "light" ? styles.light : ""}`} onClick={toggleTheme}>
    {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
  </button>
  );
};

export default ThemeSwitcher;