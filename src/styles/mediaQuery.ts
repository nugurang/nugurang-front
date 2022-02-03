import { screenSize } from '@/src/styles/size';

export type DeviceMediaQueryKeys = 'touchscreen'
                                 | 'digitizer'
                                 | 'controller'
                                 | 'pointer';
export type DeviceMediaQueryObject = {[key in DeviceMediaQueryKeys]: string};
export const deviceMediaQuery = {
  touchscreen: `@media (hover: none)  and (pointer: coarse)`,
  digitizer:   `@media (hover: none)  and (pointer: fine)`,
  controller:  `@media (hover: hover) and (pointer: coarse)`,
  pointer:     `@media (hover: hover) and (pointer: fine)`,
}

export type ScreenSizeMediaQueryKeys = 'gteWatch'
                                     | 'gteMobile'
                                     | 'gtePhablet'
                                     | 'gteTablet'
                                     | 'gteLaptop'
                                     | 'gteDesktop'
                                     | 'isWatch'
                                     | 'isMobile'
                                     | 'isPhablet'
                                     | 'isTablet'
                                     | 'isLaptop'
                                     | 'isDesktop';
export type ScreenSizeMediaQueryObject = {[key in ScreenSizeMediaQueryKeys]: string};

export const screenSizeMediaQuery = {
  gteWatch:   `@media only screen and (min-width: ${screenSize.watch})`,
  gteMobile:  `@media only screen and (min-width: ${screenSize.mobile})`,
  gtePhablet: `@media only screen and (min-width: ${screenSize.phablet})`,
  gteTablet:  `@media only screen and (min-width: ${screenSize.tablet})`,
  gteLaptop:  `@media only screen and (min-width: ${screenSize.laptop})`,
  gteDesktop: `@media only screen and (min-width: ${screenSize.desktop})`,
  isWatch:    `@media only screen and (min-width: ${screenSize.watch})   and (max-width: ${screenSize.mobile})`,
  isMobile:   `@media only screen and (min-width: ${screenSize.mobile})  and (max-width: ${screenSize.phablet})`,
  isPhablet:  `@media only screen and (min-width: ${screenSize.phablet}) and (max-width: ${screenSize.tablet})`,
  isTablet:   `@media only screen and (min-width: ${screenSize.tablet})  and (max-width: ${screenSize.desktop})`,
  isLaptop:   `@media only screen and (min-width: ${screenSize.laptop})  and (max-width: ${screenSize.laptop})`,
  isDesktop:  `@media only screen and (min-width: ${screenSize.desktop})`,
};
