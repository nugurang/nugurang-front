export type ScreenSizeKeys = 'watch'
                           | 'mobile'
                           | 'phablet'
                           | 'tablet'
                           | 'laptop'
                           | 'desktop';
export type ScreenSizeObject = {[key in ScreenSizeKeys]: string};

export const screenSize = {
  watch: '128px',
  mobile: '320px',
  phablet: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
};
