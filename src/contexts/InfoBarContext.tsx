'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface InfoBarContextType {
  isInfoBarVisible: boolean;
  setInfoBarVisible: (visible: boolean) => void;
}

const InfoBarContext = createContext<InfoBarContextType | undefined>(undefined);

export const InfoBarProvider = ({ children }: { children: ReactNode }) => {
  const [isInfoBarVisible, setInfoBarVisible] = useState(true);

  return (
    <InfoBarContext.Provider value={{ isInfoBarVisible, setInfoBarVisible }}>
      {children}
    </InfoBarContext.Provider>
  );
};

export const useInfoBar = () => {
  const context = useContext(InfoBarContext);
  if (context === undefined) {
    throw new Error('useInfoBar must be used within an InfoBarProvider');
  }
  return context;
};
