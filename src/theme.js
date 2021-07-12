import { persistStore } from "./stores/persistStore"

const defaultTheme = true // dark mode
export const isDark = persistStore("isDark", defaultTheme)
export const switchTheme = () => isDark.update((value) => !value)
//# sourceMappingURL=theme.js.map