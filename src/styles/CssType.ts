export type ColorVariant = "primary" | "error" | "greyscale" | "highContrast";
export const defaultColorVariant = "greyscale";

export type FillingVariant =
  | "contained"
  | "outlined"
  | "transparent"
  | "acrylic";
export const defaultFillingVariant = "outlined";

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export const defaultMargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export const defaultPadding = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export interface WindowSize {
  height: number;
  width: number;
}
export const defaultWindowSize = {
  height: 0,
  width: 0,
};
