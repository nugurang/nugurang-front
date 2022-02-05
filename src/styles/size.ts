export type ScreenPixelSizeKeys = 'watch'
                                | 'mobile'
                                | 'phablet'
                                | 'tablet'
                                | 'laptop'
                                | 'desktop';
export type ScreenPixelSizeObject = {[key in ScreenPixelSizeKeys]: number};

export const screenPixelSize = {
  watch: 128,
  mobile: 320,
  phablet: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};
