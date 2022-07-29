import { useEffect, useState } from "react";

// https://usehooks.com/useWindowSize/
export interface WindowSize {
  height: number;
  width: number;
}
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
