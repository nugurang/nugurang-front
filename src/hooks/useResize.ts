import { useCallback, useLayoutEffect, useState } from 'react';

export default function useResize(ref: React.RefObject<any>) {
  const [size, setSize] = useState({});

  const handleResize = useCallback(() => {
    console.log('asdf');
    if (ref.current) {
      setSize({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth
      });
    }
  }, [ref]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return size;
}
