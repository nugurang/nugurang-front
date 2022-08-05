import { DefaultMargin, DefaultPadding } from "./constants";

export type ColorShade = "main" | "light" | "dark" | "high" | "low";
export type ColorVariant =
  | "primary"
  | "error"
  | "greyscale"
  | "highContrast"
  | "translucent";
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
export const makeMargin = (margin?: Margin) => ({
  top: margin?.top || margin?.y || margin?.all || DefaultMargin.top,
  right: margin?.right || margin?.x || margin?.all || DefaultMargin.right,
  bottom: margin?.bottom || margin?.y || margin?.all || DefaultMargin.bottom,
  left: margin?.left || margin?.x || margin?.all || DefaultMargin.left,
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
export const makePadding = (padding?: Padding) => ({
  top: padding?.top || padding?.y || padding?.all || DefaultPadding.top,
  right: padding?.right || padding?.x || padding?.all || DefaultPadding.right,
  bottom:
    padding?.bottom || padding?.y || padding?.all || DefaultPadding.bottom,
  left: padding?.left || padding?.x || padding?.all || DefaultPadding.left,
});

export interface WindowSize {
  height: number;
  width: number;
}
