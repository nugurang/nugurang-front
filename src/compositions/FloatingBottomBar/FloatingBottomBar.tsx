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

const wrapCss = ({ height, margin, theme }) =>
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

interface ComponentProps {
  children?: React.ReactNode;
  height?: number;
  margin?: Margin;
  padding?: number;
}
const FloatingBottomBar = ({ children, height, margin }: ComponentProps) => {
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
      <div
        className={spacerCss({
          height: height || elementSizeCache.height,
          margin: makeMargin(margin),
          theme,
        })}></div>
      <div
        className={wrapCss({
          height: height || elementSizeCache.height,
          margin: makeMargin(margin),
          theme,
        })}>
        <div ref={innerWrapRef}>{children}</div>
      </div>
    </>
  );
};

export default FloatingBottomBar;
