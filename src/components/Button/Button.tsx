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
      cursor: pointer;

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
  colorVariant?: ColorVariant;
  fillingVariant?: FillingVariant;
  label?: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
const Button = ({
  colorVariant = defaultColorVariant,
  fillingVariant = defaultFillingVariant,
  label = "",
  preventDefault = true,
  stopPropagation = false,
  onClick: _onClick,
}: ComponentProps) => {
  const theme = useTheme();
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    preventDefault && event.preventDefault();
    stopPropagation && event.stopPropagation();
    _onClick && _onClick(event);
  };
  return (
    <button
      className={buttonCss({ theme, colorVariant, fillingVariant })}
      onClick={onClick}
      type="button">
      {label}
    </button>
  );
};

export default Button;
