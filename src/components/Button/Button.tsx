import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss, onClickCss } from "../base";
import {
  ColorVariant,
  FillingVariant,
  defaultColorVariant,
  defaultFillingVariant,
} from "@/styles/CssType";
import React from "react";

const buttonCss = ({ theme, colorVariant, fillingVariant }) =>
  cx(
    baseCss,
    onClickCss,
    css`
      padding: 8px 16px;

      color: ${theme.colors[colorVariant].main};
      background-color: ${theme.colors[colorVariant].main};
      border: 2px solid ${theme.colors[colorVariant].main};
      &:hover {
        color: ${theme.colors[colorVariant].high};
        background-color: ${theme.colors[colorVariant].high};
        border: 2px solid ${theme.colors[colorVariant].high};
      }

      ${fillingVariant === "contained" &&
      `
        color: ${theme.colors.highContrast.main};
        border: 2px solid transparent;
        &:hover {
          color: ${theme.colors.highContrast.main};
          border: 2px solid transparent;
        }
      `}
      ${fillingVariant === "outlined" &&
      `
        background-color: transparent;
        &:hover {
          background-color: transparent;
        }
      `}
      ${fillingVariant === "transparent" &&
      `
        background-color: transparent;
        border: 2px solid transparent;
        &:hover {
          background-color: transparent;
          border: 2px solid transparent;
        }
      `}
    `,
  );

interface ComponentProps {
  children?: React.ReactNode;
  colorVariant?: ColorVariant;
  fillingVariant?: FillingVariant;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
const Button = ({
  children,
  colorVariant = defaultColorVariant,
  fillingVariant = defaultFillingVariant,
  onClick,
}: ComponentProps) => {
  const theme = useTheme();
  return (
    <button
      className={buttonCss({ theme, colorVariant, fillingVariant })}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
