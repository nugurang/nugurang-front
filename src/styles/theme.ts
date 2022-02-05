import type { DeviceMediaQueryObject, ScreenSizeMediaQueryObject } from '@/src/styles/mediaQuery';
import { deviceMediaQuery, screenSizeMediaQuery } from '@/src/styles/mediaQuery';

import type { BorderRadiusObject } from '@/src/styles/borderRadius';
import type { FontObject } from '@/src/styles/font';
import type { ScreenPixelSizeObject } from '@/src/styles/size';
import type { ZIndexObject } from '@/src/styles/zIndex';
import { borderRadius } from '@/src/styles/borderRadius';
import { font } from '@/src/styles/font';
import { screenPixelSize } from '@/src/styles/size';
import { zIndex } from '@/src/styles/zIndex';

type BasePaletteRowKeys = 'main'
                        | 'light'
                        | 'dark'
                        | 'text'
                        | 'subtext';
type BasePaletteRowObject = {
  main:    string;
  light:   string;
  dark:    string;
  text:    string;
  subtext: string;
};

export type PaletteRowKeys = BasePaletteRowKeys
                           | 'high'
                           | 'low'
                           | 'contrast';
export type PaletteRowObject = BasePaletteRowObject & {
  high:     string;
  low:      string;
  contrast: string;
};

type ConstantPaletteRowObject = {
  white: string;
  black: string;
};

export type PaletteKeys = 'default'
                        | 'primary'
                        | 'secondary'
                        | 'success'
                        | 'info'
                        | 'warning'
                        | 'danger'
                        | 'background'
                        | 'transparent';
export type PaletteObject = {
  default:     PaletteRowObject;
  primary:     PaletteRowObject;
  secondary:   PaletteRowObject;
  success:     PaletteRowObject;
  info:        PaletteRowObject;
  warning:     PaletteRowObject;
  danger:      PaletteRowObject;
  background:  PaletteRowObject;
  transparent: PaletteRowObject;
  constant:    ConstantPaletteRowObject;
};

export type ThemeKeys = 'light'
                      | 'dark';
export type ThemeObject = {
  borderRadius: BorderRadiusObject;
  deviceMediaQuery: DeviceMediaQueryObject;
  font: FontObject;
  palette: PaletteObject;
  screenPixelSize: ScreenPixelSizeObject;
  screenSizeMediaQuery: ScreenSizeMediaQueryObject;
  zIndex: ZIndexObject;
};

const createPaletteRow = (
  basePaletteRowObject: BasePaletteRowObject,
  themeKey: ThemeKeys
) => {
  switch (themeKey) {
    case 'light':
      return {
        main:    basePaletteRowObject.main,
        light:   basePaletteRowObject.light,
        dark:    basePaletteRowObject.dark,
        high:    basePaletteRowObject.light,
        low:     basePaletteRowObject.dark,
        text:    basePaletteRowObject.text,
        subtext: basePaletteRowObject.subtext,
        contrast: '#000'
      }
    case 'dark':
      return {
        main:    basePaletteRowObject.main,
        light:   basePaletteRowObject.light,
        dark:    basePaletteRowObject.dark,
        high:    basePaletteRowObject.dark,
        low:     basePaletteRowObject.light,
        text:    basePaletteRowObject.text,
        subtext: basePaletteRowObject.subtext,
        contrast: '#fff'
      }
    }
}

const defaultBasePaletteRow = {
  main:    '#BEBEBE', // Medium Gray - https://en.wikipedia.org/wiki/Shades_of_gray
  light:   '#F1F1F1',
  dark:    '#8B8B8B',
  text:    '#fff',
  subtext: '#888',
};
const defaultLightPaletteRow = createPaletteRow(defaultBasePaletteRow, 'light');
const defaultDarkPaletteRow = createPaletteRow(defaultBasePaletteRow, 'dark');

const primaryBasePaletteRow = {
  main: '#9A4EAE', // Purpureus - https://en.wikipedia.org/wiki/Shades_of_violet
  light: '#CD81E1',
  dark: '#671B7B',
  text: '#fff',
  subtext: '#888',
};
const primaryLightPaletteRow = createPaletteRow(primaryBasePaletteRow, 'light');
const primaryDarkPaletteRow = createPaletteRow(primaryBasePaletteRow, 'dark');

const secondaryBasePaletteRow = {
  main: '#6495ED', // Cornflower blue - https://en.wikipedia.org/wiki/Shades_of_azure
  light: '#97C8FF',
  dark: '#3162BA',
  text: '#fff',
  subtext: '#888',
};
const secondaryLightPaletteRow = createPaletteRow(secondaryBasePaletteRow, 'light');
const secondaryDarkPaletteRow = createPaletteRow(secondaryBasePaletteRow, 'dark');

const successBasePaletteRow = {
  main: '#32CD32', // Lime green https://en.wikipedia.org/wiki/Shades_of_green
  light: '#65FF65',
  dark: '#009A00',
  text: '#fff',
  subtext: '#888',
};
const successLightPaletteRow = createPaletteRow(successBasePaletteRow, 'light');
const successDarkPaletteRow = createPaletteRow(successBasePaletteRow, 'dark');

const infoBasePaletteRow = {
  main: '#73C2FB', // Maya blue - https://en.wikipedia.org/wiki/Shades_of_azure
  light: '#A6F5FF',
  dark: '#408FC8',
  text: '#fff',
  subtext: '#888',
};
const infoLightPaletteRow = createPaletteRow(infoBasePaletteRow, 'light');
const infoDarkPaletteRow = createPaletteRow(infoBasePaletteRow, 'dark');

const warningBasePaletteRow = {
  main: '#ED9121', // Carrot orange - https://en.wikipedia.org/wiki/Shades_of_orange
  light: '#FFC454',
  dark: '#BA5E00',
  text: '#000',
  subtext: '#888',
};
const warningLightPaletteRow = createPaletteRow(warningBasePaletteRow, 'light');
const warningDarkPaletteRow = createPaletteRow(warningBasePaletteRow, 'dark');

const dangerBasePaletteRow = {
  main: '#E03C31', // Chili red - https://en.wikipedia.org/wiki/Shades_of_red
  light: '#FF6F64',
  dark: '#AD0900',
  text: '#fff',
  subtext: '#888',
};
const dangerLightPaletteRow = createPaletteRow(dangerBasePaletteRow, 'light');
const dangerDarkPaletteRow = createPaletteRow(dangerBasePaletteRow, 'dark');

const backgroundLightBasePaletteRow = {
  main: '#fff',
  light: '#fff',
  dark: '#eee',
  text: '#000',
  subtext: '#888',
};
const backgroundDarkPBasePaletteRow = {
  main: '#000',
  light: '#111',
  dark: '#000',
  text: '#fff',
  subtext: '#888',
};
const backgroundLightPaletteRow = createPaletteRow(backgroundLightBasePaletteRow, 'light');
const backgroundDarkPaletteRow = createPaletteRow(backgroundDarkPBasePaletteRow, 'dark');

const transparentLightBasePaletteRow = {
  main: '#ffffff01',
  light: '#ffffff01',
  dark: '#ffffff01',
  text: '#000',
  subtext: '#888',
};
const transparentDarkBasePaletteRow = {
  main: '#00000001',
  light: '#00000001',
  dark: '#00000001',
  text: '#fff',
  subtext: '#888',
};
const transparentLightPaletteRow = createPaletteRow(transparentLightBasePaletteRow, 'light');
const transparentDarkPaletteRow = createPaletteRow(transparentDarkBasePaletteRow, 'dark');

const constantPaletteRow = {
  white: '#fff',
  black: '#000',
};

export const lightPalette = {
  default: defaultLightPaletteRow,
  primary: primaryLightPaletteRow,
  secondary: secondaryLightPaletteRow,
  success: successLightPaletteRow,
  info: infoLightPaletteRow,
  warning: warningLightPaletteRow,
  danger: dangerLightPaletteRow,
  background: backgroundLightPaletteRow,
  transparent: transparentLightPaletteRow,
  constant: constantPaletteRow
};

export const darkPalette = {
  default: defaultDarkPaletteRow,
  primary: primaryDarkPaletteRow,
  secondary: secondaryDarkPaletteRow,
  success: successDarkPaletteRow,
  info: infoDarkPaletteRow,
  warning: warningDarkPaletteRow,
  danger: dangerDarkPaletteRow,
  background: backgroundDarkPaletteRow,
  transparent: transparentDarkPaletteRow,
  constant: constantPaletteRow
};

const theme = {
  borderRadius,
  deviceMediaQuery,
  font,
  screenPixelSize,
  screenSizeMediaQuery,
  zIndex
};

export const lightTheme = {
  ...theme,
  palette: lightPalette
};

export const darkTheme = {
  ...theme,
  palette: darkPalette
};
