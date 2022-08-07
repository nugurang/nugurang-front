import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { baseCss } from "@/components/css";
import { useElementSize } from "@/hooks/utilities";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/utilities";
import { makeMargin, Margin } from "@/components/type";

const spacerCss = ({ height, margin, theme }) =>
  cx(
    baseCss,
    css`
      box-sizing: border-box;
      height: ${margin ? height + margin.top + margin.bottom : height}px;
      background-color: #f00;
    `,
  );

const floatWrapCss = ({ margin, theme }) =>
  cx(
    baseCss,
    css`
      position: fixed;
      box-sizing: border-box;
      bottom: 0;
      left: 0;
      right: 0;
      padding: ${margin
        ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`
        : "0"};
    `,
  );

const floatInnerWrapCss = () =>
  cx(
    baseCss,
    css`
      width: fit-content;
      margin: 0 auto;
    `,
  );

const nonFloatWrapCss = ({ theme }) =>
  cx(
    baseCss,
    css`
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
  margin = { bottom: 8 },
}: ComponentProps) => {
  const theme = useTheme();
  const childrenWrapRef = useRef();
  const elementSize = useElementSize(childrenWrapRef);
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
              margin: makeMargin(margin),
              theme,
            })}>
            <div ref={childrenWrapRef} className={floatInnerWrapCss()}>
              {children}
            </div>
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
