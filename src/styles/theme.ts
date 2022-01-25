import { darkPalette, lightPalette } from '@/src/styles/palette';

import borderRadius from '@/src/styles/borderRadius';
import mediaQuery from '@/src/styles/mediaQuery';
import size from '@/src/styles/size';

export const lightTheme = {
  mediaQuery,
  size,
  borderRadius,
  palette: lightPalette,
};

export const darkTheme = {
  mediaQuery,
  size,
  borderRadius,
  palette: darkPalette
};
