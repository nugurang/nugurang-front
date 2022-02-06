import { useEffect, useState } from 'react';

export default function useResize(ref: React.RefObject<any>) {
  const [size, setSize] = useState({});

  function handleResize() {
    setSize({
      height: ref.current.offsetHeight,
      width: ref.current.offsetWidth
    });
  }

  useEffect(() => {
    document.addEventListener('resize', handleResize, true);
    handleResize();
    return () => document.removeEventListener('resize', handleResize);
  }, [ref]);
  return size;
}
