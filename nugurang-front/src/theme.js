import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#D7B8FF",
      main: "#9778EC",
      dark: "#5738AC",
      text: "#fff",
    },
    secondary: {
      light: "#D7B8FF",
      main: "#9778EC",
      dark: "#5738AC",
      text: "#fff",
    },
    error: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiAccordion: {
      root: {
        border: '0rem solid',
        borderRadius: 5,
      },
    },
    MuiAvatar: {
      root: {
        background: "transparent",
        color: "black",
        height: '2rem',
        width: '2rem',
        margin: '0.5rem',
      },
    },
    MuiButton: {
      text: {
        border: '0.15rem solid #9778ec40',
        borderRadius: 5,
        color: "#5738AC",
        height: "2.5rem",
        margin: '0 0.5rem',
        padding: '0 1.5rem',
        fontSize: 16,
        fontWeight: 400,
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
      },
    },
    MuiCard: {
      root: {
        border: '0.15rem solid #9778ec40',
        borderRadius: 5,
        background: "FFF7FF",
        margin: '0.5rem',
        padding: '0',
      },
    },
    MuiCssBaseline: {
      "@global": {
        '@font-face': ["Ubuntu"],
      },
    },
    MuiDivider: {
      root: {
        border: '0.05rem solid #9778ec40',
      },
    },
    MuiIconButton: {
      root: {
        color: "black",
      },
    },
    MuiPaper: {
      elevation0: {
        border: '0rem solid',
        borderRadius: 5,
        margin: '0rem 1rem',
        padding: '0.5rem',
      },
      elevation1: {
        border: '0.15rem solid #9778ec40',
        borderRadius: 5,
        margin: '0rem 1rem',
        padding: '0.5rem',
        boxShadow: "none",
      },
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Ubuntu",
    fontSize: 16,
    color: "#000000",
    test: {
      fontSize: 20,
      fontWeight: 400,
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordWrap: "break-word",
    },
  },
});

export default theme;
