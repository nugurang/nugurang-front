import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../base";
import { CSSProperties } from "react";
import { Margin, Padding } from "@/styles/CssType";

const wrapCss = ({ margin }) =>
  cx(
    baseCss,
    css`
      margin: 0 auto;
      padding: ${margin
        ? `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
        : "0"};
    `,
  );

const containerCss = ({ backgroundColor, padding, theme }) =>
  cx(
    baseCss,
    css`
      padding: ${padding
        ? `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`
        : "8px"};
      background-color: ${backgroundColor || theme.colors.highContrast.high};
    `,
  );

interface ComponentProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  margin?: Margin;
  padding?: Padding;
  css?: CSSProperties;
}
const Container = ({
  backgroundColor,
  children,
  margin,
  padding,
  css,
}: ComponentProps) => {
  const theme = useTheme();
  return (
    <div className={wrapCss({ margin })}>
      <div
        className={containerCss({
          backgroundColor,
          padding,
          theme,
        })}
        style={css}>
        {children}
      </div>
    </div>
  );
};

export default Container;
