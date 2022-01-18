const size = {
  smallest: '0',
  small: '320px',
  medium: '768px',
  large: '1024px',
  largest: '1280px',
};

const mediaQuery = {
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
};

export default mediaQuery;
