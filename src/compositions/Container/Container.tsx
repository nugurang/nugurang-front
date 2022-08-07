import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { Card } from "@/components/Card";
import { baseCss } from "@/components/css";
import { useContext, useMemo } from "react";
import { Margin, Padding } from "@/components/type";
import { Theme } from "@/components/theme";
import { WindowMinWidth } from "@/components/constants";
import { getMaxEqualOrSmallerFromArray } from "@/utilities/math";
import { WindowSizeContext } from "@/contexts/WindowSizeContext";
import { WindowSize } from "@/hooks/utilities";

const wrapCss = ({ fixedWidthThresholds, margin, maxWidth, minWidth, width }) =>
  cx(
    baseCss,
    css`
      width: ${width ? `${width}px` : "100%"};
      min-width: ${minWidth
        ? `${minWidth}px`
        : `${Math.min(...fixedWidthThresholds)}px`};
      max-width: ${maxWidth
        ? `${maxWidth}px`
        : `${Math.max(...fixedWidthThresholds)}px`};
      margin: 0 auto;
      padding: ${margin
        ? `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`
        : "16px 8px"};
    `,
  );

const innerWrapCss = () =>
  cx(
    baseCss,
    css`
      & > * {
        margin-top: 16px;
      }
      & > *:first-child {
        margin-top: 0;
      }
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
  fixedWidthThresholds = Object.values(WindowMinWidth),
  margin,
  maxWidth,
  minWidth,
  padding,
  width: _width,
}: ComponentProps) => {
  const theme = useTheme() as Theme;
  const windowSize: WindowSize = useContext(WindowSizeContext) as WindowSize;
  const width = useMemo(() => {
    return fixedWidth
      ? getMaxEqualOrSmallerFromArray(
          [...fixedWidthThresholds, 0],
          _width || windowSize.width,
        )
      : _width || windowSize.width;
  }, [_width, windowSize.width, fixedWidth]);

  return (
    <div
      className={wrapCss({
        fixedWidthThresholds,
        margin,
        maxWidth,
        minWidth,
        width,
      })}>
      <Card
        backgroundColor={backgroundColor || theme.colors.translucent.high}
        padding={padding}>
        <div className={innerWrapCss()}>{children}</div>
      </Card>
    </div>
  );
};

export default Container;
