export type ScreenSizeKeys = 'watch'
                           | 'mobile'
                           | 'tablet'
                           | 'laptop'
                           | 'desktop';
export type ScreenSizeObject = {[key in ScreenSizeKeys]: string};

export const screenSize = {
  watch: '0',
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
};
