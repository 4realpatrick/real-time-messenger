"use client";
import React, { useEffect, useState } from "react";
import {
  TTheme,
  STATIC_THEME_KEY,
  getTheme,
  themeData,
} from "../constant/theme";

const ThemeController = () => {
  const [currentTheme, setCurrentTheme] = useState<TTheme>(getTheme());
  const handleThemeChange = (theme: TTheme) => (e: React.MouseEvent) => {
    if (theme === currentTheme) return;
    localStorage.setItem(STATIC_THEME_KEY, theme);
    setCurrentTheme(theme);
  };
  useEffect(() => {
    document?.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);
  return (
    <div className="dropdown mb-72">
      <div tabIndex={0} role="button" className="btn m-1 btn-primary">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
        {themeData.map((theme) => (
          <li onClick={handleThemeChange(theme)} key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              defaultChecked={theme === currentTheme}
              aria-label={theme}
              value={theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeController;
