export interface RGB {
  red: number;
  green: number;
  blue: number;
}

export type ColorDarknessKeys = 0
                              | 50
                              | 100
                              | 200
                              | 300
                              | 400
                              | 500
                              | 600
                              | 700
                              | 800
                              | 900
                              | 950
                              | 1000;
export type ColorDarknessObject = {[key in ColorDarknessKeys]: number};

export type ColorKeys = 'mediumGray'
                      | 'purpureus'
                      | 'cornflowerBlue'
                      | 'limeGreen'
                      | 'mayaBlue'
                      | 'carrotOrange'
                      | 'chiliRed';
export type ColorObject = {[key in ColorKeys]: string};

// #BEBEBE
const mediumGray = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 249, green: 249, blue: 249 },
   100: { red: 236, green: 236, blue: 236 },
   200: { red: 222, green: 222, blue: 222 },
   300: { red: 206, green: 206, blue: 206 },
   400: { red: 186, green: 186, blue: 186 },
   500: { red: 160, green: 160, blue: 160 },
   600: { red: 132, green: 132, blue: 132 },
   700: { red: 108, green: 108, blue: 108 },
   800: { red:  89, green:  89, blue:  89 },
   900: { red:  63, green:  63, blue:  63 },
   950: { red:  39, green:  39, blue:  39 },
  1000: { red:   0, green:   0, blue:   0 },
};

// #9A4EAE
const purpureus = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 251, green: 248, blue: 252 },
   100: { red: 243, green: 233, blue: 245 },
   200: { red: 233, green: 217, blue: 238 },
   300: { red: 223, green: 199, blue: 229 },
   400: { red: 209, green: 174, blue: 218 },
   500: { red: 191, green: 143, blue: 204 },
   600: { red: 171, green: 108, blue: 188 },
   700: { red: 152, green:  77, blue: 172 },
   800: { red: 126, green:  64, blue: 142 },
   900: { red:  90, green:  45, blue: 101 },
   950: { red:  55, green:  28, blue:  62 },
  1000: { red:   0, green:   0, blue:   0 },
};

// #6495ED
const cornflowerBlue = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 247, green: 250, blue: 254 },
   100: { red: 228, green: 237, blue: 252 },
   200: { red: 208, green: 223, blue: 250 },
   300: { red: 186, green: 208, blue: 247 },
   400: { red: 155, green: 187, blue: 243 },
   500: { red: 116, green: 160, blue: 239 },
   600: { red:  88, green: 131, blue: 209 },
   700: { red:  72, green: 108, blue: 171 },
   800: { red:  60, green:  89, blue: 141 },
   900: { red:  42, green:  63, blue: 100 },
   950: { red:  26, green:  39, blue:  62 },
  1000: { red:   0, green:   0, blue:   0 },
};

// #32CD32
const limeGreen = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 243, green: 252, blue: 243 },
   100: { red: 213, green: 245, blue: 213 },
   200: { red: 179, green: 236, blue: 179 },
   300: { red: 138, green: 227, blue: 138 },
   400: { red:  77, green: 212, blue:  77 },
   500: { red:  45, green: 184, blue:  45 },
   600: { red:  37, green: 152, blue:  37 },
   700: { red:  30, green: 125, blue:  30 },
   800: { red:  25, green: 103, blue:  25 },
   900: { red:  18, green:  73, blue:  18 },
   950: { red:  11, green:  45, blue:  11 },
  1000: { red:   0, green:   0, blue:   0 },
};

// #73C2FB
const mayaBlue = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 244, green: 250, blue: 255 },
   100: { red: 219, green: 239, blue: 254 },
   200: { red: 191, green: 227, blue: 253 },
   300: { red: 159, green: 213, blue: 252 },
   400: { red: 115, green: 194, blue: 251 },
   500: { red:  99, green: 166, blue: 215 },
   600: { red:  81, green: 137, blue: 178 },
   700: { red:  67, green: 113, blue: 146 },
   800: { red:  55, green:  93, blue: 120 },
   900: { red:  39, green:  66, blue:  85 },
   950: { red:  24, green:  41, blue:  52 },
  1000: { red:   0, green:   0, blue:   0 },
};

// #ED9121
const carrotOrange = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 254, green: 249, blue: 242 },
   100: { red: 252, green: 234, blue: 212 },
   200: { red: 249, green: 217, blue: 178 },
   300: { red: 246, green: 198, blue: 141 },
   400: { red: 241, green: 172, blue:  88 },
   500: { red: 227, green: 139, blue:  32 },
   600: { red: 188, green: 115, blue:  26 },
   700: { red: 154, green:  94, blue:  21 },
   800: { red: 127, green:  78, blue:  18 },
   900: { red:  91, green:  55, blue:  13 },
   950: { red:  56, green:  34, blue:   8 },
  1000: { red:   0, green:   0, blue:   0 },
};

// #E03C31
const chiliRed = {
     0: { red: 255, green: 255, blue: 255 },
    50: { red: 254, green: 248, blue: 248 },
   100: { red: 251, green: 232, blue: 231 },
   200: { red: 249, green: 214, blue: 212 },
   300: { red: 245, green: 194, blue: 191 },
   400: { red: 241, green: 167, blue: 162 },
   500: { red: 235, green: 130, blue: 123 },
   600: { red: 228, green:  82, blue:  73 },
   700: { red: 200, green:  53, blue:  44 },
   800: { red: 165, green:  44, blue:  36 },
   900: { red: 119, green:  32, blue:  26 },
   950: { red:  74, green:  20, blue:  16 },
  1000: { red:   0, green:   0, blue:   0 },
};

export const color = {
  mediumGray,
  purpureus,
  cornflowerBlue,
  limeGreen,
  mayaBlue,
  carrotOrange,
  chiliRed,
};

export const stringifyRGB = (rgb: RGB) => `#${rgb.red.toString(16)}${rgb.green.toString(16)}${rgb.blue.toString(16)}`;
