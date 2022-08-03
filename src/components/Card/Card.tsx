import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../css";
import { CSSProperties } from "react";
import { makePadding, Margin, Padding } from "@/components/type";

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

const cardCss = ({ backgroundColor, height, padding, theme, width }) =>
  cx(
    baseCss,
    css`
      ${height ? `height: ${height}px;` : ""}
      ${width ? `width: ${width}px;` : ""}
      padding: ${padding
        ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
        : "0"};
      background-color: ${backgroundColor || theme.colors.highContrast.high};
    `,
  );

interface ComponentProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  css?: CSSProperties;
  height?: number;
  margin?: Margin;
  padding?: Padding;
  width?: number;
}
const Card = ({
  backgroundColor,
  children,
  css,
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
