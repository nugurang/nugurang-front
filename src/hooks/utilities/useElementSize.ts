// https://usehooks-ts.com/react-hook/use-element-size

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Size {
  width: number;
  height: number;
}

function useElementSize<T extends HTMLElement = HTMLDivElement>(
  ref: React.RefObject<T>,
): Size {
  const element = ref.current;
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setSize({
      width: element?.offsetWidth || 0,
      height: element?.offsetHeight || 0,
    });
  };

  useIsomorphicLayoutEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element?.offsetHeight, element?.offsetWidth]);

  return size;
}

export default useElementSize;
