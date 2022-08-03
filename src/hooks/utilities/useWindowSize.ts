// https://usehooks.com/useWindowSize

import { useEffect, useState } from "react";

export interface WindowSize {
  height: number;
  width: number;
}
export const useWindowSize = () => {
  const [size, setSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowSize;
