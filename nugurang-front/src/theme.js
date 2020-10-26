import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#D7B8FF",
      main: "#9778ec",
      dark: "#5738AC",
      text: "#eee",
    },
    secondary: {
      light: "#D7B8FF",
      main: "#9778ec",
      dark: "#5738AC",
      text: "#eee",
    },
    tertiary: {
      light: "#D7B8FF",
      main: "#9778ec",
      dark: "#5738AC",
      text: "#eee",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    typography: {
      useNextVariants: true,
      "fontFamily": ['"Ubuntu"', '"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"].join(','),
      "fontSize": 16,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
   },
  },
});

export default theme;
