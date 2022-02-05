import { useEffect, useState } from 'react';

const useResize = (ref: React.RefObject<any>) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [ref])

  return {
    height,
    width
  }
};

export default useResize;
