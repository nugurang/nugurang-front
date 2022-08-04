export const windowMinWidth = {
  none: 0,
  watch: 256,
  mobile: 480,
  tablet: 640,
  phablet: 800,
  laptop: 1024,
  desktop: 1280,
};

export type ColorShade = "main" | "light" | "dark" | "high" | "low";
export type ColorVariant = "primary" | "error" | "greyscale" | "highContrast";
export const defaultColorVariant = "greyscale";

export type FillingVariant =
  | "contained"
  | "outlined"
  | "transparent"
  | "acrylic";
export const defaultFillingVariant = "outlined";

interface BaseMargin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
export interface Margin extends BaseMargin {
  x?: number;
  y?: number;
  all?: number;
}
export const defaultMargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
export const makeMargin = (margin?: Margin) => ({
  top: margin?.top || margin?.y || margin?.all || defaultMargin.top,
  right: margin?.right || margin?.x || margin?.all || defaultMargin.right,
  bottom: margin?.bottom || margin?.y || margin?.all || defaultMargin.bottom,
  left: margin?.left || margin?.x || margin?.all || defaultMargin.left,
});

interface BasePadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
export interface Padding extends BasePadding {
  x?: number;
  y?: number;
  all?: number;
}
export const defaultPadding = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
export const makePadding = (padding?: Padding) => ({
  top: padding?.top || padding?.y || padding?.all || defaultPadding.top,
  right: padding?.right || padding?.x || padding?.all || defaultPadding.right,
  bottom:
    padding?.bottom || padding?.y || padding?.all || defaultPadding.bottom,
  left: padding?.left || padding?.x || padding?.all || defaultPadding.left,
});

export interface WindowSize {
  height: number;
  width: number;
}
export const defaultWindowSize = {
  height: 0,
  width: 0,
};
