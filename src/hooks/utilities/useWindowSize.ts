// https://usehooks.com/useWindowSize

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface WindowSize {
  height: number;
  width: number;
}
export const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    setSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  }, [window?.innerWidth, window?.innerHeight]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useIsomorphicLayoutEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.innerWidth, window?.innerHeight]);
  return size;
};

export default useWindowSize;
