import { ColorShade, ColorVariant } from "./type";

export interface Theme {
  colors: {
    [key in ColorVariant]: {
      [key in ColorShade]: string;
    };
  };
}

export const lightTheme = {
  colors: {
    primary: {
      main: "#bf00ff",
      light: "#e599ff",
      dark: "##4c0066",
      high: "#e599ff",
      low: "#4c0066",
    },
    error: {
      main: "#e03c31",
      light: "#fa8072",
      dark: "#960018",
      high: "#fa8072",
      low: "#960018",
    },
    greyscale: {
      main: "#888",
      light: "#666",
      dark: "#aaa",
      high: "#666",
      low: "#aaa",
    },
    highContrast: {
      main: "#eee",
      light: "#fff",
      dark: "#ddd",
      high: "#fff",
      low: "#ddd",
    },
    translucent: {
      main: "#0002",
      light: "#0000",
      dark: "#0004",
      high: "#0000",
      low: "#0004",
    },
  },
};

export const darkTheme = {
  colors: {
    primary: {
      main: "#bf00ff",
      light: "#e599ff",
      dark: "#4c0066",
      high: "#4c0066",
      low: "#e599ff",
    },
    error: {
      main: "#e03c31",
      light: "#fa8072",
      dark: "#960018",
      high: "#960018",
      low: "#fa8072",
    },
    greyscale: {
      main: "#888",
      light: "#666",
      dark: "#aaa",
      high: "#aaa",
      low: "#666",
    },
    highContrast: {
      main: "#111",
      light: "#222",
      dark: "#000",
      high: "#000",
      low: "#222",
    },
    translucent: {
      main: "#0002",
      light: "#0000",
      dark: "#0004",
      high: "#0004",
      low: "#0000",
    },
  },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};
