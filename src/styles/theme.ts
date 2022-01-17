export const size = {
  smallest: '0',
  small: '320px',
  medium: '768px',
  large: '1024px',
  largest: '1280px',
};

const theme = {
  color: {
    default: {
      main: '#C0C0C0', // Silver - https://en.wikipedia.org/wiki/Shades_of_gray
      light: '#F3F3F3',
      dark: '#8D8D8D',
    },
    primary: {
      main: '#B284BE', // African violet - https://en.wikipedia.org/wiki/Shades_of_violet
      light: '#E5B7F1',
      dark: '#7F518B',
    },
    secondary: {
      main: '#6495ED', // Cornflower blue - https://en.wikipedia.org/wiki/Shades_of_azure
      light: '#97C8FF',
      dark: '#3162BA',
    },
    success: {
      main: '#32CD32', // Lime green https://en.wikipedia.org/wiki/Shades_of_green
      light: '#65FF65',
      dark: '#009A00',
    },
    info: {
      main: '#73C2FB', // Maya blue - https://en.wikipedia.org/wiki/Shades_of_azure
      light: '#A6F5FF',
      dark: '#408FC8',
    },
    warning: {
      main: '	#ED9121', // Carrot orange - https://en.wikipedia.org/wiki/Shades_of_orange
      light: '#FFC454',
      dark: '#BA5E00',
    },
    danger: {
      main: '#E03C31', // Chili red - https://en.wikipedia.org/wiki/Shades_of_red
      light: '#FF6F64',
      dark: '#AD0900',
    },
    text: {
      light: '#000',
      dark: '#fff',
    },
    background: {
      light: '#fff',
      dark: '#000',
    },
  },
  mediaQuery: {
    gtWatch: `@media only screen and (min-width: ${size.smallest})`,
    gtMobile: `@media only screen and (min-width: ${size.small})`,
    gtTablet: `@media only screen and (min-width: ${size.medium})`,
    gtLaptop: `@media only screen and (min-width: ${size.large})`,
    gtDesktop: `@media only screen and (min-width: ${size.largest})`,

    isWatch: `@media only screen and (min-width: ${size.smallest}) and (max-width: ${size.small})`,
    isMobile: `@media only screen and (min-width: ${size.small}) and (max-width: ${size.medium})`,
    isTablet: `@media only screen and (min-width: ${size.medium}) and (max-width: ${size.large})`,
    isLaptop: `@media only screen and (min-width: ${size.large}) and (max-width: ${size.largest})`,
    isDesktop: `@media only screen and (min-width: ${size.largest})`,
  },
};

export default theme;
