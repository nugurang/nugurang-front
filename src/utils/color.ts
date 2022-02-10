export const hexToRGB = (hex: string, alpha?: number) => {
  const shortenHexType = hex.length < 7;
  const red   = shortenHexType ? parseInt(hex.slice(1, 2), 16) * 16 : parseInt(hex.slice(1, 3), 16),
        green = shortenHexType ? parseInt(hex.slice(2, 3), 16) * 16 : parseInt(hex.slice(3, 5), 16),
        blue  = shortenHexType ? parseInt(hex.slice(3, 4), 16) * 16 : parseInt(hex.slice(5, 7), 16);
  if (alpha) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  } else {
    return `rgb(${red}, ${green}, ${blue})`;
  }
};
