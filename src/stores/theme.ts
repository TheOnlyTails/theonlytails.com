import { persistStore } from "./persistStore";

const defaultTheme = true; // dark mode

export const isDark = persistStore("isDark", defaultTheme)