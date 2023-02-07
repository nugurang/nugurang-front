import {
  ReactNode,
  createContext,
  useCallback,
  useState
} from 'react';

export type ThemeKey = 'light' | 'dark';
export type FillVariantKey = 'filled' | 'outlined' | 'text';
type ThemeTypography = {
  fontFamily: string[];
};
interface ThemePaletteColor {
  main: string;
  light: string;
  dark: string;
  high: string;
  low: string;
  text: string;
  contrastText: string;
}
interface ThemePalette {
  primary: ThemePaletteColor;
  error: ThemePaletteColor;
  default: ThemePaletteColor;
}
interface BaseTheme {
  typography: ThemeTypography;
}
export interface Theme extends BaseTheme {
  key: ThemeKey;
  palette: ThemePalette;
}
export type PaletteKey = keyof ThemePalette;

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
};

const lightTheme = {
  ...baseTheme,
  key: 'light' as ThemeKey,
  palette: {
    primary: {
      main: '#673ab7',
      light: '#8561c5',
      dark: '#482880',
      high: '#8561c5',
      low: '#482880',
      text: '#000',
      contrastText: '#fff',
    },
    error: {
      main: '#e03c31',
      light: '#ef9d97',
      dark: '#761811',
      high: '#ef9d97',
      low: '#761811',
      text: '#000',
      contrastText: '#fff',
    },
    default: {
      main: '#888',
      light: '#c3c3c3',
      dark: '#444',
      high: '#c3c3c3',
      low: '#444',
      text: '#000',
      contrastText: '#fff',
    },
  },
};
const darkTheme = {
  ...baseTheme,
  key: 'dark' as ThemeKey,
  palette: {
    primary: {
      main: '#888',
      light: '#aaa',
      dark: '#666',
      high: '#666',
      low: '#aaa',
      text: '#fff',
      contrastText: '#000',
    },
    error: {
      main: '#e03c31',
      light: '#ef9d97',
      dark: '#761811',
      high: '#761811',
      low: '#ef9d97',
      text: '#fff',
      contrastText: '#000',
    },
    default: {
      main: '#888',
      light: '#c3c3c3',
      dark: '#444',
      high: '#444',
      low: '#c3c3c3',
      text: '#fff',
      contrastText: '#000',
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

const useTheme = () => {
  const [themeKey, setThemeKey] = useState('light');

  const toggleTheme = useCallback(() => {
    setThemeKey((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    themeKey,
    toggleTheme,
  };
};
interface ThemeProviderProps {
  children: ReactNode;
};
export const ThemeContext = createContext({
  theme: getTheme(defaultThemeKey),
  toggleTheme: () => {},
});
export const ThemeProvider = ({
  children
}: ThemeProviderProps) => {
  const {
    themeKey,
    toggleTheme
  } = useTheme();

  return (
    <ThemeContext.Provider value={{
      theme: getTheme(themeKey),
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
