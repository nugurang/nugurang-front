import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { useContext, useMemo } from "react";
import { Margin, Padding } from "@/components/type";
import { getMaxEqualOrSmallerFromArray } from "@/utilities/math";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { WindowSize } from "@/hooks/utilities";

const wrapCss = ({ margin, width }) =>
  cx(
    baseCss,
    css`
      width: ${width ? `${width}px` : "100%"};
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
  fixedWidthThresholds?: number[];
  margin?: Margin;
  padding?: Padding;
  width?: number;
}
const Container = ({
  backgroundColor,
  children,
  fixedWidth = false,
  fixedWidthThresholds = [480, 768, 1024, 1280],
  margin,
  padding,
  width: _width,
}: ComponentProps) => {
  const theme = useTheme();
  const windowSize: WindowSize = useContext(WindowSizeContext) as WindowSize;
  const width = useMemo(() => {
    return fixedWidth
      ? getMaxEqualOrSmallerFromArray(
          [...fixedWidthThresholds, 0],
          _width || windowSize.width,
        )
      : _width || windowSize.width;
  }, [_width, windowSize.width]);

  return (
    <div
      className={wrapCss({
        margin,
        width,
      })}>
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
