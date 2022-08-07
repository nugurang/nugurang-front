import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../css";
import { CSSProperties } from "react";
import {
  FillingVariant,
  makePadding,
  Margin,
  Padding,
} from "@/components/type";

const wrapCss = ({ margin }) =>
  cx(
    baseCss,
    css`
      margin: 0 auto;
      padding: ${margin
        ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
        : "0"};
    `,
  );

const cardCss = ({
  backgroundColor,
  fillingVariant,
  height,
  padding,
  theme,
  width,
}) =>
  cx(
    baseCss,
    css`
      ${height ? `height: ${height}px;` : ""}
      ${width ? `width: ${width}px;` : ""}
      padding: ${padding
        ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
        : "0"};
      background-color: ${backgroundColor || theme.colors.highContrast.high};

      ${fillingVariant === "contained" &&
      `
        color: ${theme.colors.highContrast.main};
        border: 2px solid transparent;
      `}
      ${fillingVariant === "outlined" &&
      `
        background-color: transparent;
      `}
      ${fillingVariant === "transparent" &&
      `
        background-color: transparent;
        border: 2px solid transparent;
      `}
    `,
  );

interface ComponentProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  css?: CSSProperties;
  fillingVariant?: FillingVariant;
  height?: number;
  margin?: Margin;
  padding?: Padding;
  width?: number;
}
const Card = ({
  backgroundColor,
  children,
  css,
  fillingVariant,
  height,
  margin,
  padding,
  width,
}: ComponentProps) => {
  const theme = useTheme();
  return (
    <div className={wrapCss({ margin })}>
      <div
        className={cardCss({
          backgroundColor,
          fillingVariant,
          height,
          padding: makePadding(padding),
          theme,
          width,
        })}
        style={css}>
        {children}
      </div>
    </div>
  );
};

export default Card;
