export type ScreenPixelSizeKeys = 'none'
                                | 'watch'
                                | 'mobile'
                                | 'phablet'
                                | 'tablet'
                                | 'laptop'
                                | 'desktop';
export type ScreenPixelSizeObject = {[key in ScreenPixelSizeKeys]: number};

export const screenPixelSize = {
  none:    0,
  watch:   128,
  mobile:  320,
  phablet: 576,
  tablet:  768,
  laptop:  1024,
  desktop: 1280,
};
