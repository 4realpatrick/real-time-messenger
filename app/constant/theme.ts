export const STATIC_THEME_KEY = "messenger_app_theme";
export type TTheme =
  | "light"
  | "dark"
  | "cupcake"
  | "cyberpunk"
  | "emerald"
  | "retro";
export const themeData: TTheme[] = [
  "light",
  "dark",
  "cupcake",
  "cyberpunk",
  "emerald",
  "retro",
];

export const getTheme = (): TTheme => {
  const themeFromDocument =
    (document?.documentElement.getAttribute("data-theme") as TTheme) || null;
  const themeFromStorage = localStorage.getItem(
    STATIC_THEME_KEY
  ) as TTheme | null;
  return themeFromDocument || themeFromStorage || "light";
};
