import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss, onClickCss } from "../css";
import {
  ColorVariant,
  FillingVariant,
  defaultColorVariant,
  defaultFillingVariant,
} from "@/components/type";
import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
  isFontAwesomeIconProps,
} from "../Icon";

const iconButtonCss = ({ theme, colorVariant, fillingVariant }) =>
  cx(
    baseCss,
    onClickCss,
    css`
      border: 0px solid #000;
      border-radius: 50%;
      padding: 4px;

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
  icon?: FontAwesomeIconProps;
  label?: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
const IconButton = ({
  colorVariant = defaultColorVariant,
  fillingVariant = defaultFillingVariant,
  icon,
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
      className={iconButtonCss({ theme, colorVariant, fillingVariant })}
      onClick={onClick}
      type="button">
      {isFontAwesomeIconProps(icon) && (
        <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
      )}
    </button>
  );
};

export default IconButton;
