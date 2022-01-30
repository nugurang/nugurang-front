import type { ThemeObject } from '@/src/styles/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeObject {}
}
