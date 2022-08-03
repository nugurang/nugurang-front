import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../base";
import {
  ColorVariant,
  FillingVariant,
  defaultColorVariant,
  defaultFillingVariant,
} from "@/styles/CssType";
import { ChangeEvent } from "react";

const textfieldCss = ({ colorVariant, fillingVariant, theme, width }) =>
  cx(
    baseCss,
    css`
      display: block;
      width: ${Number.isInteger(width) ? `${width}px` : "100%"};
      padding: 8px;
      box-sizing: border-box;

      color: ${theme.colors[colorVariant].main};
      background-color: ${theme.colors[colorVariant].main};
      border: 2px solid ${theme.colors[colorVariant].main};
      outline-color: ${theme.colors[colorVariant].main};
      &:hover,
      &:focus {
        background-color: ${theme.colors[colorVariant].high};
        border: 2px solid ${theme.colors[colorVariant].high};
        outline-color: ${theme.colors.primary.high};
      }

      ${fillingVariant === "contained" &&
      `
        color: ${theme.colors.highContrast.main};
        outline-color: transparent;
        &:hover, &:focus {
          color: ${theme.colors.highContrast.high};
          border: 2px solid transparent;
        }
      `}
      ${fillingVariant === "outlined" &&
      `
        background-color: transparent;
        &:hover, &:focus {
          background-color: transparent;
        }
      `}
      ${fillingVariant === "transparent" &&
      `
        background-color: transparent;
        outline-color: transparent;
        &:hover, &:focus {
          background-color: transparent;
          border: 2px solid transparent;
          outline-color: transparent;
        }
      `}
    `,
  );

interface ComponentProps {
  value: string;
  colorVariant?: ColorVariant;
  fillingVariant?: FillingVariant;
  width?: number;
  onChange?: (value: string) => void;
}
const Textfield = ({
  value,
  colorVariant = defaultColorVariant,
  fillingVariant = defaultFillingVariant,
  width,
  onChange,
}: ComponentProps) => {
  const theme = useTheme();
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return (
    <input
      className={textfieldCss({ colorVariant, fillingVariant, theme, width })}
      type="text"
      value={value}
      onChange={onChangeInput}></input>
  );
};

export default Textfield;
