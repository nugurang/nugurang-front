import { createContext } from "react";
import { useWindowSize, type WindowSize } from "@/hooks/utilities";

const WindowSizeContext = createContext({});

const WindowSizeProvider = ({ children }) => {
  const windowSize: WindowSize = useWindowSize();

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export { WindowSizeProvider, WindowSizeContext };
