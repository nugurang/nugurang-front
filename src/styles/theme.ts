import { createTheme } from '@mui/material/styles';

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
  mode: 'light',
  palette: {
    primary: {
      main: '#673ab7',
      light: '#8561c5',
      dark: '#482880',
      contrastText: '#ffffff',
    },
  },
};

export default {
  light: createTheme(lightTheme),
};
