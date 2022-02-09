import { useCallback, useEffect, useState } from 'react';

export default function useResize(ref: React.RefObject<any>) {
  const [size, setSize] = useState({
    height: 0,
    width: 0
  });

  const handleResize = useCallback(() => {
    if (ref.current) {
      setSize({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth
      });
    }
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return size;
}
