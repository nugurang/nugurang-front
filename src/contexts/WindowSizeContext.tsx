import { createContext } from 'react';
import { useWindowSize, WindowSize } from '@/hooks/utilities';

// https://usehooks.com/useWindowSize/

const WindowSizeContext = createContext<WindowSize>(undefined);

function WindowSizeProvider({ children }) {
  const windowSize = useWindowSize();

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export { WindowSizeProvider, WindowSizeContext };
