import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "../css";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { useContext } from "react";
import { Margin, Padding } from "@/components/type";

const wrapCss = ({ fixedWidth, margin, windowSize }) =>
  cx(
    baseCss,
    css`
      width: ${fixedWidth ? "360px" : windowSize.width};
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
        : "0"};
      background-color: ${backgroundColor || theme.colors.highContrast.high};
    `,
  );

interface ComponentProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  fixedWidth?: boolean;
  margin?: Margin;
  padding?: Padding;
}
const Container = ({
  backgroundColor,
  children,
  fixedWidth = false,
  margin,
  padding,
}: ComponentProps) => {
  const theme = useTheme();
  const windowSize = useContext(WindowSizeContext);
  return (
    <div className={wrapCss({ fixedWidth, margin, windowSize })}>
      <div
        className={containerCss({
          backgroundColor,
          padding,
          theme,
        })}>
        {children}
      </div>
    </div>
  );
};

export default Container;
