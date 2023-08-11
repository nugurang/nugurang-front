'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { createPortal } from 'react-dom';

export interface BackdropContextProps {
  backdropChild?: React.ReactNode
  setBackdropChild: Dispatch<SetStateAction<React.ReactNode>>
  openBackdrop: (lhs: React.ReactNode) => void
  closeBackdrop: () => void
}

export const BackdropContext = createContext<BackdropContextProps>({
  backdropChild: undefined,
  setBackdropChild: () => {},
  openBackdrop: () => {},
  closeBackdrop: () => {},
});

export default function BackdropProvider({ children }) {
  const destinationElementId = 'backdrop-portal-destination';
  const [backdropChild, setBackdropChild] = useState<React.ReactNode>(undefined);

  const openBackdrop = (backdropChild: React.ReactNode) => {
    setBackdropChild(backdropChild)
  }
  const closeBackdrop = () => {
    setBackdropChild(undefined)
  }

  return (
    <BackdropContext.Provider
      value={{
        backdropChild,
        setBackdropChild,
        openBackdrop,
        closeBackdrop,
      }}
    >
      {children}
      {backdropChild ? (
        createPortal((
          <div className={[
            'fixed', 'top-0', 'bottom-0', 'left-0', 'right-0',
            'flex', 'justify-center', 'items-center',
            'backdrop-brightness-50',
          ].join(' ')}>
            {backdropChild}
          </div>
        ), document.getElementById(destinationElementId) as HTMLElement)
      ) : <></>}
    </BackdropContext.Provider>
  );
}
