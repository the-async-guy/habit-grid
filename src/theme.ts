import { createGlobalStyle, type DefaultTheme } from "styled-components";

declare module "styled-components" {
  // Extend DefaultTheme so styled components get proper typing
  export interface DefaultTheme {
    mode: "dark" | "light";
    background: string;
    backgroundSecondary: string;
    card: string;
    borderSubtle: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentSoft: string;
    danger: string;
    success: string;
    shadowSoft: string;
  }
}

export const darkTheme: DefaultTheme = {
  mode: "dark",
  background: "#000000",
  backgroundSecondary: "#1C1C1E",
  card: "rgba(28, 28, 30, 0.9)",
  borderSubtle: "rgba(255,255,255,0.06)",
  textPrimary: "#FFFFFF",
  textSecondary: "#A1A1AA",
  accent: "#0A84FF",
  accentSoft: "rgba(10,132,255,0.2)",
  danger: "#FF453A",
  success: "#30D158",
  shadowSoft: "0 18px 60px rgba(0,0,0,0.6)",
};

export const lightTheme: DefaultTheme = {
  mode: "light",
  background: "#F2F2F7",
  backgroundSecondary: "#FFFFFF",
  card: "rgba(255, 255, 255, 0.9)",
  borderSubtle: "rgba(0,0,0,0.06)",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  accent: "#007AFF",
  accentSoft: "rgba(0,122,255,0.15)",
  danger: "#FF3B30",
  success: "#34C759",
  shadowSoft: "0 18px 40px rgba(15,23,42,0.18)",
};

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => (theme.mode === "dark" ? "dark" : "light")};
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    min-height: 100dvh;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui,
      -system-ui, sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    min-height: 100vh;
    min-height: 100dvh;
  }

  button {
    font-family: inherit;
  }
`;
