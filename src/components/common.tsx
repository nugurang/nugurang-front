import { useCallback, useEffect, useState } from 'react';

export const isClient = () => typeof window !== 'undefined';

export const useMediaQuery = (mediaQueryString: string) => {
  const [isMatched, setMatched] = useState<boolean>(false);
  const updateTarget = useCallback((event: MediaQueryListEvent) => {
    if (event.matches) {
      setMatched(true);
    } else {
      setMatched(false);
    }
  }, []);

  useEffect(() => {
    if (isClient()) {
      const media = window.matchMedia(mediaQueryString);
      media.addEventListener('change', updateTarget);
      if (media.matches) {
        setMatched(true);
      }
      return () => {
        media.removeEventListener('change', updateTarget);
      };
    }
  }, []);
  return [isMatched];
};

// https://stackoverflow.com/questions/27745438/how-to-compute-getboundingclientrect-without-considering-transforms
const adjustedBoundingRect = (ref: React.RefObject<any>) => {
  const el = ref.current;
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const tx = style.transform;

  if (tx) {
    let sx, sy, dx, dy;
    let ta, to;
    if (tx.startsWith('matrix3d(')) {
      ta = tx.slice(9,-1).split(/, /);
      sx = +ta[0];
      sy = +ta[5];
      dx = +ta[12];
      dy = +ta[13];
    } else if (tx.startsWith('matrix(')) {
      ta = tx.slice(7,-1).split(/, /);
      sx = +ta[0];
      sy = +ta[3];
      dx = +ta[4];
      dy = +ta[5];
    } else {
      return rect;
    }
    to = style.transformOrigin;

    const x = rect.x - dx - (1 - sx) * parseFloat(to);
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
    const w = sx ? rect.width / sx : el.offsetWidth;
    const h = sy ? rect.height / sy : el.offsetHeight;
    return {
      x: x, y: y, width: w, height: h, top: y, right: x + w, bottom: y + h, left: x
    };
  } else {
    return rect;
  }
};
export interface UseElementDistanceFromViewportDistance {
  top: number;
  left: number;
  bottom: number;
  right: number;
};
export const useElementDistanceFromViewport = (ref?: React.RefObject<any>) => {
  const [distance, setDistance] = useState<UseElementDistanceFromViewportDistance>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const handleResize = useCallback(() => {
    if (isClient() && ref?.current) {
      const boundingClientRect = adjustedBoundingRect(ref);
      const distance = {
        top: boundingClientRect.top,
        left: boundingClientRect.left,
        bottom: (window.innerHeight || document.documentElement.clientHeight) - boundingClientRect.bottom,
        right: (window.innerWidth || document.documentElement.clientWidth) - boundingClientRect.right,
      }
      setDistance(distance);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);
  return [distance, handleResize];
};
