'use client';

import { createContext, useContext, useState } from 'react';

type LoadingContextType = {
  isLoaded: boolean;
  setLoaded: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoaded: false,
  setLoaded: () => {},
});

export const useLoadingContext = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoaded, setLoaded: setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}