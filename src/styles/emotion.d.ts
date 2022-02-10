import type { ThemeObject } from '@/src/styles/theme';

import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends ThemeObject {}
}
