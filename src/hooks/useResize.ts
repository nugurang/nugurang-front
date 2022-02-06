import { useEffect, useState } from 'react';

export default function useSize() {
  const [size, setSize] = useState({});

  function handleResize() {
    const { innerWidth, innerHeight } = window;

    setSize({ width: innerWidth, height: innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, true);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}
