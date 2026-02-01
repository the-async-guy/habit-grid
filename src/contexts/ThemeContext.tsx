import { createContext, useContext, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  themeMode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({
  themeMode,
  children,
}: {
  themeMode: ThemeMode;
  children: ReactNode;
}) {
  return (
    <ThemeContext.Provider value={{ themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within an AppThemeProvider");
  }
  return context;
}
