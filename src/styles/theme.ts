import type { DeviceMediaQueryObject, ScreenSizeMediaQueryObject } from '@/src/styles/props/mediaQuery';
import { color, stringifyRGB } from '@/src/styles/props/color';
import { deviceMediaQuery, screenSizeMediaQuery } from '@/src/styles/props/mediaQuery';

import type { BorderRadiusObject } from '@/src/styles/props/borderRadius';
import type { FontObject } from '@/src/styles/props/font';
import type { KeyframeObject } from '@/src/styles/props/keyframe';
import type { ScreenPixelSizeObject } from '@/src/styles/props/size';
import type { ZIndexObject } from '@/src/styles/props/zIndex';
import { borderRadius } from '@/src/styles/props/borderRadius';
import { font } from '@/src/styles/props/font';
import { keyframe } from '@/src/styles/props/keyframe';
import { screenPixelSize } from '@/src/styles/props/size';
import { zIndex } from '@/src/styles/props/zIndex';

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
  borderRadius:         BorderRadiusObject;
  deviceMediaQuery:     DeviceMediaQueryObject;
  font:                 FontObject;
  keyframe:             KeyframeObject;
  palette:              PaletteObject;
  screenPixelSize:      ScreenPixelSizeObject;
  screenSizeMediaQuery: ScreenSizeMediaQueryObject;
  zIndex:               ZIndexObject;
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
        contrast: stringifyRGB(color.mediumGray[1000]),
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
        contrast: stringifyRGB(color.mediumGray[0]),
      }
    }
}

const defaultBasePaletteRow = {
  main:    stringifyRGB(color.mediumGray[400]),
  light:   stringifyRGB(color.mediumGray[200]),
  dark:    stringifyRGB(color.mediumGray[600]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const defaultLightPaletteRow = createPaletteRow(defaultBasePaletteRow, 'light');
const defaultDarkPaletteRow = createPaletteRow(defaultBasePaletteRow, 'dark');

const primaryBasePaletteRow = {
  main:    stringifyRGB(color.purpureus[600]),
  light:   stringifyRGB(color.purpureus[400]),
  dark:    stringifyRGB(color.purpureus[800]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const primaryLightPaletteRow = createPaletteRow(primaryBasePaletteRow, 'light');
const primaryDarkPaletteRow = createPaletteRow(primaryBasePaletteRow, 'dark');

const secondaryBasePaletteRow = {
  main:    stringifyRGB(color.cornflowerBlue[600]),
  light:   stringifyRGB(color.cornflowerBlue[400]),
  dark:    stringifyRGB(color.cornflowerBlue[800]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const secondaryLightPaletteRow = createPaletteRow(secondaryBasePaletteRow, 'light');
const secondaryDarkPaletteRow = createPaletteRow(secondaryBasePaletteRow, 'dark');

const successBasePaletteRow = {
  main:    stringifyRGB(color.limeGreen[600]),
  light:   stringifyRGB(color.limeGreen[400]),
  dark:    stringifyRGB(color.limeGreen[800]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const successLightPaletteRow = createPaletteRow(successBasePaletteRow, 'light');
const successDarkPaletteRow = createPaletteRow(successBasePaletteRow, 'dark');

const infoBasePaletteRow = {
  main:    stringifyRGB(color.mayaBlue[600]),
  light:   stringifyRGB(color.mayaBlue[400]),
  dark:    stringifyRGB(color.mayaBlue[800]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const infoLightPaletteRow = createPaletteRow(infoBasePaletteRow, 'light');
const infoDarkPaletteRow = createPaletteRow(infoBasePaletteRow, 'dark');

const warningBasePaletteRow = {
  main:    stringifyRGB(color.carrotOrange[600]),
  light:   stringifyRGB(color.carrotOrange[400]),
  dark:    stringifyRGB(color.carrotOrange[800]),
  text:    stringifyRGB(color.mediumGray[1000]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const warningLightPaletteRow = createPaletteRow(warningBasePaletteRow, 'light');
const warningDarkPaletteRow = createPaletteRow(warningBasePaletteRow, 'dark');

const dangerBasePaletteRow = {
  main:    stringifyRGB(color.chiliRed[600]),
  light:   stringifyRGB(color.chiliRed[400]),
  dark:    stringifyRGB(color.chiliRed[800]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const dangerLightPaletteRow = createPaletteRow(dangerBasePaletteRow, 'light');
const dangerDarkPaletteRow = createPaletteRow(dangerBasePaletteRow, 'dark');

const backgroundLightBasePaletteRow = {
  main:    stringifyRGB(color.mediumGray[0]),
  light:   stringifyRGB(color.mediumGray[0]),
  dark:    stringifyRGB(color.mediumGray[100]),
  text:    stringifyRGB(color.mediumGray[1000]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const backgroundDarkPBasePaletteRow = {
  main:    stringifyRGB(color.mediumGray[1000]),
  light:   stringifyRGB(color.mediumGray[900]),
  dark:    stringifyRGB(color.mediumGray[1000]),
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const backgroundLightPaletteRow = createPaletteRow(backgroundLightBasePaletteRow, 'light');
const backgroundDarkPaletteRow = createPaletteRow(backgroundDarkPBasePaletteRow, 'dark');

const transparentLightBasePaletteRow = {
  main:    '#ffffff01',
  light:   '#ffffff01',
  dark:    '#ffffff01',
  text:    stringifyRGB(color.mediumGray[1000]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const transparentDarkBasePaletteRow = {
  main:    '#00000001',
  light:   '#00000001',
  dark:    '#00000001',
  text:    stringifyRGB(color.mediumGray[0]),
  subtext: stringifyRGB(color.mediumGray[500]),
};
const transparentLightPaletteRow = createPaletteRow(transparentLightBasePaletteRow, 'light');
const transparentDarkPaletteRow = createPaletteRow(transparentDarkBasePaletteRow, 'dark');

const constantPaletteRow = {
  white: stringifyRGB(color.mediumGray[0]),
  black: stringifyRGB(color.mediumGray[1000]),
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
  color,
  deviceMediaQuery,
  font,
  keyframe,
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
