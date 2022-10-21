// https://github.com/rehooks/component-size/blob/master/index.js

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface ElementSize {
  height: number;
  width: number;
}

function getSize<T extends HTMLElement = HTMLDivElement>(element: T) {
  if (!element) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

function useElementSize(ref) {
  const _useState = useState(getSize(ref ? ref.current : {}));
  const elementSize = _useState[0];
  const setElementSize = _useState[1];

  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setElementSize(getSize(ref.current));
      }
    },
    [ref, setElementSize],
  );

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(ref.current);

      // eslint-disable-next-line consistent-return
      return () => {
        resizeObserver.disconnect();
        resizeObserver = null;
      };
    }
    window.addEventListener('resize', handleResize);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);

  return elementSize;
}

export default useElementSize;
