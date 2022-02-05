import { useEffect, useState } from 'react';

const useResize = (ref: React.RefObject<any>) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const resize = () => {
    const handleResize = () => {
      setHeight(ref.current.offsetHeight);
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('load', handleResize);
    if (document.readyState == 'complete') {
      handleResize();
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    }
  };
  useEffect(() => resize(), [ref]);

  return {
    height,
    width
  }
};

export default useResize;
