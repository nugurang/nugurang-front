import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { useContext, useEffect, useMemo } from "react";
import { Margin, Padding } from "@/components/type";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { WindowSize } from "@/hooks/utilities";

const getMaxEqualOrSmallerFromArray = (array: number[], target: number) => {
  const uniqueArray = [...array, 0].filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  const arrayEqualOrSmallerThanTarget = [...uniqueArray].filter((value) => {
    return value <= target;
  });
  const sortedArray = [...arrayEqualOrSmallerThanTarget].sort();
  const result = sortedArray.pop();
  return result;
};

const wrapCss = ({ margin, maxWidth, minWidth, width }) =>
  cx(
    baseCss,
    css`
      width: ${width ? `${width}px` : "100%"};
      ${minWidth && `min-width: ${minWidth}px`};
      ${maxWidth && `max-width: ${maxWidth}px`};
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
  maxWidth?: number;
  minWidth?: number;
  padding?: Padding;
  width?: number;
}
const Container = ({
  backgroundColor,
  children,
  fixedWidth = false,
  fixedWidthThresholds = [480, 768, 1024, 1280],
  margin,
  maxWidth,
  minWidth,
  padding,
  width: _width,
}: ComponentProps) => {
  const theme = useTheme();
  const windowSize = useContext(WindowSizeContext) as WindowSize;
  const width = useMemo(() => {
    return fixedWidth
      ? getMaxEqualOrSmallerFromArray(
          fixedWidthThresholds,
          Math.max(_width || 0, windowSize.width),
        )
      : _width || windowSize.width;
  }, [_width, windowSize.width]);

  return (
    <div
      className={wrapCss({
        margin,
        maxWidth,
        minWidth,
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
