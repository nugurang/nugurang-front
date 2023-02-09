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
type ThemeZIndex = {
  tooltip: number;
  modal: number;
  header: number;
  footer: number;
  default: number;
  hidden: number;
};
interface ThemePaletteColor {
  main: string;
  light: string;
  dark: string;
  high: string;
  low: string;
  background: string;
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
    tooltip: 8000,
    modal: 6000,
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
      main: '#673ab7',
      light: '#8561c5',
      dark: '#482880',
      high: '#8561c5',
      low: '#482880',
      background: '#f8f8f8',
      text: '#000',
      contrastText: '#fff',
    },
    error: {
      main: '#e03c31',
      light: '#ef9d97',
      dark: '#761811',
      high: '#ef9d97',
      low: '#761811',
      background: '#f8f8f8',
      text: '#000',
      contrastText: '#fff',
    },
    default: {
      main: '#dfdfdf',
      light: '#efefef',
      dark: '#cfcfcf',
      high: '#cfcfcf',
      low: '#efefef',
      background: '#f8f8f8',
      text: '#fff',
      contrastText: '#000',
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
      background: '#080808',
      text: '#fff',
      contrastText: '#000',
    },
    error: {
      main: '#e03c31',
      light: '#ef9d97',
      dark: '#761811',
      high: '#761811',
      low: '#ef9d97',
      background: '#080808',
      text: '#fff',
      contrastText: '#000',
    },
    default: {
      main: '#202020',
      light: '#303030',
      dark: '#101010',
      high: '#101010',
      low: '#303030',
      background: '#080808',
      text: '#000',
      contrastText: '#fff',
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
