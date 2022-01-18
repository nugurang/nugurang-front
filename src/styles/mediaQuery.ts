import screenSize from './screenSize';

const mediaQuery = {
  gtWatch: `@media only screen and (min-width: ${screenSize.minWatch})`,
  gtMobile: `@media only screen and (min-width: ${screenSize.minMobile})`,
  gtTablet: `@media only screen and (min-width: ${screenSize.minTablet})`,
  gtLaptop: `@media only screen and (min-width: ${screenSize.minLaptop})`,
  gtDesktop: `@media only screen and (min-width: ${screenSize.minDesktop})`,

  isWatch: `@media only screen and (min-width: ${screenSize.minWatch}) and (max-width: ${screenSize.minMobile})`,
  isMobile: `@media only screen and (min-width: ${screenSize.minMobile}) and (max-width: ${screenSize.minTablet})`,
  isTablet: `@media only screen and (min-width: ${screenSize.minTablet}) and (max-width: ${screenSize.minDesktop})`,
  isLaptop: `@media only screen and (min-width: ${screenSize.minLaptop}) and (max-width: ${screenSize.minLaptop})`,
  isDesktop: `@media only screen and (min-width: ${screenSize.minDesktop})`,
};

export default mediaQuery;
