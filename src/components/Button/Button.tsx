import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss, onClickCss, singleLineEllipsisCss } from "../css";
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

const buttonCss = ({ colorVariant, fillingVariant, height, theme, width }) =>
  cx(
    baseCss,
    onClickCss,
    css`
      position: relative;
      padding: 8px 16px;
      ${height ? `height: ${height}px;` : ""}
      ${width ? `width: ${width}px;` : ""}

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

const iconWrapCss = ({ iconPosition, label, theme }) =>
  cx(
    baseCss,
    css`
      ${iconPosition === "left" ? "margin-right: 4px;" : ""}
      ${iconPosition === "right" ? "margin-left: 4px;" : ""}
    `,
  );

const labelWrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      display: inline-block;
    `,
  );

const labelCss = ({ theme }) => cx(baseCss, singleLineEllipsisCss, css``);

export type IconPosition = "top" | "right" | "bottom" | "left";
interface ComponentProps {
  colorVariant?: ColorVariant;
  compact?: boolean;
  fillingVariant?: FillingVariant;
  height?: number;
  icon?: FontAwesomeIconProps;
  iconPosition?: IconPosition;
  label?: string;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  width?: number;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
const Button = ({
  colorVariant = defaultColorVariant,
  compact = false,
  fillingVariant = defaultFillingVariant,
  height,
  icon,
  iconPosition = "left",
  label = "",
  preventDefault = true,
  stopPropagation = false,
  width,
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
      className={buttonCss({
        colorVariant,
        fillingVariant,
        height,
        theme,
        width,
      })}
      onClick={onClick}
      type="button">
      {isFontAwesomeIconProps(icon) && iconPosition === "top" && (
        <div className={iconWrapCss({ iconPosition, label, theme })}>
          <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
        </div>
      )}
      {isFontAwesomeIconProps(icon) && iconPosition === "left" && (
        <span className={iconWrapCss({ iconPosition, label, theme })}>
          <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
        </span>
      )}
      {!(compact && isFontAwesomeIconProps(icon)) && (
        <span className={labelWrapCss({ theme })}>
          <span className={labelCss({ theme })}>{label}</span>
        </span>
      )}
      {isFontAwesomeIconProps(icon) && iconPosition === "right" && (
        <span className={iconWrapCss({ iconPosition, label, theme })}>
          <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
        </span>
      )}
      {isFontAwesomeIconProps(icon) && iconPosition === "bottom" && (
        <div className={iconWrapCss({ iconPosition, label, theme })}>
          <FontAwesomeIcon prefix={icon.prefix} name={icon.name} />
        </div>
      )}
    </button>
  );
};

export default Button;
