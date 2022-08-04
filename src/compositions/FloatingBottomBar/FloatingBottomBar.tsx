import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { useElementSize } from "@/hooks/utilities";
import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/utilities";
import { makeMargin, Margin } from "@/components/type";

const spacerCss = ({ height, margin, theme }) =>
  cx(
    baseCss,
    css`
      height: ${margin ? height + margin.top + margin.bottom : height}px;
      box-sizing: border-box;
    `,
  );

const floatWrapCss = ({ height, margin, theme }) =>
  cx(
    baseCss,
    css`
      position: fixed;
      bottom: 0;
      height: ${margin ? height + margin.top + margin.bottom : height}px;
      padding: ${margin
        ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
        : "0"};
      box-sizing: border-box;
      left: 50%;
      transform: translateX(-50%);
    `,
  );

const nonFloatWrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
      width: fit-content;
      margin: 0 auto;
    `,
  );

interface ComponentProps {
  children?: React.ReactNode;
  float?: boolean;
  height?: number;
  margin?: Margin;
  padding?: number;
}
const FloatingBottomBar = ({
  children,
  float = true,
  height,
  margin,
}: ComponentProps) => {
  const theme = useTheme();
  const innerWrapRef = useRef<HTMLDivElement | undefined>(undefined);
  const elementSize = useElementSize(innerWrapRef);
  const [elementSizeCache, setElementSizeCache] = useState({
    height: 0,
    width: 0,
  });

  useIsomorphicLayoutEffect(() => {
    setElementSizeCache((prev) => {
      if (elementSize.height === 0 || elementSize.width === 0) return prev;
      else return elementSize;
    });
  }, [elementSize]);

  return (
    <>
      {float && (
        <>
          <div
            className={spacerCss({
              height: height || elementSizeCache.height,
              margin: makeMargin(margin),
              theme,
            })}></div>
          <div
            className={floatWrapCss({
              height: height || elementSizeCache.height,
              margin: makeMargin(margin),
              theme,
            })}>
            <div ref={innerWrapRef}>{children}</div>
          </div>
        </>
      )}
      {!float && (
        <div
          className={nonFloatWrapCss({
            theme,
          })}>
          {children}
        </div>
      )}
    </>
  );
};

export default FloatingBottomBar;
