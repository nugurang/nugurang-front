import {
  ReactNode,
  createContext,
  useState,
  useEffect
} from 'react';
import { isClient } from './common';

export type ThemeKey = 'light' | 'dark';
export type FillVariantKey = 'filled' | 'outlined' | 'text';
type ThemeTypography = {
  fontFamily: string[];
};
type ThemeZIndex = {
  modalTooltip: number;
  modal: number;
  backdrop: number;
  tooltip: number;
  header: number;
  footer: number;
  default: number;
  hidden: number;
};
interface ThemePaletteColor {
  base: string;
  main: string;
  light: string;
  dark: string;
  high: string;
  low: string;
  background: string;
  text: string;
  contrastText: string;
  transparent: string;
}
interface ThemePalette {
  primary: ThemePaletteColor;
  error: ThemePaletteColor;
  default: ThemePaletteColor;
}
interface BaseTheme {
  typography: ThemeTypography;
  zIndex: ThemeZIndex;
}
export interface Theme extends BaseTheme {
  key: ThemeKey;
  palette: ThemePalette;
}
export type PaletteKey = keyof ThemePalette;
export type PaletteColorKey = keyof ThemePaletteColor;

const baseTheme = {
  typography: {
    fontFamily: [
      'KOMACON',
      '-apple-system',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  zIndex: {
    modalTooltip: 5000,
    modal: 7100,
    backdrop: 7000,
    tooltip: 5000,
    header: 3000,
    footer: 2000,
    default: 0,
    hidden: -1,
  },
};

const lightTheme = {
  ...baseTheme,
  key: 'light' as ThemeKey,
  palette: {
    primary: {
      base: '#fff',
      main: '#673ab7',
      light: '#8561c5',
      dark: '#482880',
      high: '#8561c5',
      low: '#482880',
      background: '#f8f8f8',
      text: '#000',
      contrastText: '#fff',
      transparent: '#000f',
    },
    error: {
      base: '#fff',
      main: '#e03c31',
      light: '#ef9d97',
      dark: '#761811',
      high: '#ef9d97',
      low: '#761811',
      background: '#f8f8f8',
      text: '#000',
      contrastText: '#fff',
      transparent: '#000f',
    },
    default: {
      base: '#fff',
      main: '#dfdfdf',
      light: '#efefef',
      dark: '#cfcfcf',
      high: '#efefef',
      low: '#cfcfcf',
      background: '#f8f8f8',
      text: '#000',
      contrastText: '#000',
      transparent: '#000f',
    },
  },
};
const darkTheme = {
  ...baseTheme,
  key: 'dark' as ThemeKey,
  palette: {
    primary: {
      base: '#000',
      main: '#673ab7',
      light: '#8561c5',
      dark: '#482880',
      high: '#8561c5',
      low: '#482880',
      background: '#f8f8f8',
      text: '#fff',
      contrastText: '#000',
      transparent: '#000f',
    },
    error: {
      base: '#000',
      main: '#e03c31',
      light: '#ef9d97',
      dark: '#761811',
      high: '#761811',
      low: '#ef9d97',
      background: '#080808',
      text: '#fff',
      contrastText: '#000',
      transparent: '#000f',
    },
    default: {
      base: '#000',
      main: '#202020',
      light: '#303030',
      dark: '#0f0f0f',
      high: '#0f0f0f',
      low: '#303030',
      background: '#080808',
      text: '#fff',
      contrastText: '#fff',
      transparent: '#000f',
    },
  },
};
const theme: {
  [key: string]: any
} = {
  light: lightTheme,
  dark: darkTheme,
};
const defaultThemeKey = 'light';
export const getTheme = (key: string) => {
  return (theme[key] as Theme) ?? theme[defaultThemeKey];
};

interface ThemeProviderProps {
  children: ReactNode;
};
export const ThemeContext = createContext({
  theme: getTheme(defaultThemeKey),
  setThemeKey: (_: ThemeKey) => {},
});
export const ThemeProvider = ({
  children
}: ThemeProviderProps) => {
  const [themeKey, _setThemeKey] = useState(defaultThemeKey);
  const setThemeKey = (key: ThemeKey) => {
    _setThemeKey(key);
    localStorage.setItem('theme-key', key);
  };

  useEffect(() => {
    if (isClient()) {
      _setThemeKey((localStorage.getItem('theme-key') ?? defaultThemeKey) as ThemeKey);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme: getTheme(themeKey),
      setThemeKey,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
