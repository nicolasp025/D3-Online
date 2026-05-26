import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ConsentContextType = {
  consent: boolean;
  setConsent: (newValue: boolean) => void;
};

const ConsentContext = createContext<ConsentContextType | null>(null);

export const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useLocalStorage<boolean>("exp-consent", false);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        setConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent must be used within a ConsentProvider");
  return context;
};
