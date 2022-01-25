import mediaQuery from '@/src/styles/mediaQuery';
import screenSize from '@/src/styles/screenSize';

const lightTheme = {
  mediaQuery,
  screenSize,
  palette: {
    default: {
      main: '#C0C0C0', // Silver - https://en.wikipedia.org/wiki/Shades_of_gray
      light: '#F3F3F3',
      dark: '#8D8D8D',
      text: '#fff',
      smallText: '#eee',
    },
    primary: {
      main: '#9A4EAE', // Purpureus - https://en.wikipedia.org/wiki/Shades_of_violet
      light: '#CD81E1',
      dark: '#671B7B',
      text: '#fff',
      smallText: '#eee',
    },
    secondary: {
      main: '#6495ED', // Cornflower blue - https://en.wikipedia.org/wiki/Shades_of_azure
      light: '#97C8FF',
      dark: '#3162BA',
      text: '#fff',
      smallText: '#eee',
    },
    success: {
      main: '#32CD32', // Lime green https://en.wikipedia.org/wiki/Shades_of_green
      light: '#65FF65',
      dark: '#009A00',
      text: '#fff',
      smallText: '#eee',
    },
    info: {
      main: '#73C2FB', // Maya blue - https://en.wikipedia.org/wiki/Shades_of_azure
      light: '#A6F5FF',
      dark: '#408FC8',
      text: '#fff',
      smallText: '#eee',
    },
    warning: {
      main: '#ED9121', // Carrot orange - https://en.wikipedia.org/wiki/Shades_of_orange
      light: '#FFC454',
      dark: '#BA5E00',
      text: '#000',
      smallText: '#111',
    },
    danger: {
      main: '#E03C31', // Chili red - https://en.wikipedia.org/wiki/Shades_of_red
      light: '#FF6F64',
      dark: '#AD0900',
      text: '#fff',
      smallText: '#eee',
    },
    background: {
      main: '#fff',
      light: '#fff',
      dark: '#eee',
      text: '#000',
      smallText: '#111',
    },
    constant: {
      white: '#fff',
      black: '#000',
    }
  },
};

export default lightTheme;
