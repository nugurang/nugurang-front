// https://github.com/rehooks/component-size/blob/master/index.js

import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  var _useState = useState(getSize(ref ? ref.current : {}));
  var ElementSize = _useState[0];
  var setElementSize = _useState[1];

  var handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setElementSize(getSize(ref.current));
      }
    },
    [ref],
  );

  useIsomorphicLayoutEffect(
    function () {
      if (!ref.current) {
        return;
      }

      handleResize();

      if (typeof ResizeObserver === "function") {
        var resizeObserver = new ResizeObserver(function () {
          handleResize();
        });
        resizeObserver.observe(ref.current);

        return function () {
          resizeObserver.disconnect();
          resizeObserver = null;
        };
      } else {
        window.addEventListener("resize", handleResize);

        return function () {
          window.removeEventListener("resize", handleResize);
        };
      }
    },
    [ref.current],
  );

  return ElementSize;
}

export default useElementSize;
