import { createContext, useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/utilities";

// https://usehooks.com/useWindowSize/

const WindowSizeContext = createContext({});

const WindowSizeProvider = ({ children }) => {
  const windowSize = useWindowSize();

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export { WindowSizeProvider, WindowSizeContext };
