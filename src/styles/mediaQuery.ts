import { screenSize } from '@/src/styles/size';

const mediaQuery = {
  gtWatch: `@media only screen and (min-width: ${screenSize.watch})`,
  gtMobile: `@media only screen and (min-width: ${screenSize.mobile})`,
  gtTablet: `@media only screen and (min-width: ${screenSize.tablet})`,
  gtLaptop: `@media only screen and (min-width: ${screenSize.laptop})`,
  gtDesktop: `@media only screen and (min-width: ${screenSize.desktop})`,

  isWatch: `@media only screen and (min-width: ${screenSize.watch}) and (max-width: ${screenSize.mobile})`,
  isMobile: `@media only screen and (min-width: ${screenSize.mobile}) and (max-width: ${screenSize.tablet})`,
  isTablet: `@media only screen and (min-width: ${screenSize.tablet}) and (max-width: ${screenSize.desktop})`,
  isLaptop: `@media only screen and (min-width: ${screenSize.laptop}) and (max-width: ${screenSize.laptop})`,
  isDesktop: `@media only screen and (min-width: ${screenSize.desktop})`,
};

export default mediaQuery;
