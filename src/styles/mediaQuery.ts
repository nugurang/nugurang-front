import { screenPixelSize } from '@/src/styles/size';

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
  gteWatch:   `@media only screen and (min-width: ${screenPixelSize.watch}px)`,
  gteMobile:  `@media only screen and (min-width: ${screenPixelSize.mobile}px)`,
  gtePhablet: `@media only screen and (min-width: ${screenPixelSize.phablet}px)`,
  gteTablet:  `@media only screen and (min-width: ${screenPixelSize.tablet}px)`,
  gteLaptop:  `@media only screen and (min-width: ${screenPixelSize.laptop}px)`,
  gteDesktop: `@media only screen and (min-width: ${screenPixelSize.desktop}px)`,
  isWatch:    `@media only screen and (min-width: ${screenPixelSize.watch}px)   and (max-width: ${screenPixelSize.mobile}px)`,
  isMobile:   `@media only screen and (min-width: ${screenPixelSize.mobile}px)  and (max-width: ${screenPixelSize.phablet}px)`,
  isPhablet:  `@media only screen and (min-width: ${screenPixelSize.phablet}px) and (max-width: ${screenPixelSize.tablet}px)`,
  isTablet:   `@media only screen and (min-width: ${screenPixelSize.tablet}px)  and (max-width: ${screenPixelSize.desktop}px)`,
  isLaptop:   `@media only screen and (min-width: ${screenPixelSize.laptop}px)  and (max-width: ${screenPixelSize.laptop}px)`,
  isDesktop:  `@media only screen and (min-width: ${screenPixelSize.desktop}px)`,
};
