import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ExperimentContextType = {
  consent: boolean;
  setConsent: (newValue: boolean) => void;
  url1: string | null;
  setUrl1: (newValue: string) => void;
  url2: string | null;
  setUrl2: (newValue: string) => void;
  userID: string | null;
  setUserID: (newValue: string) => void;
};

const ExperimentContext = createContext<ExperimentContextType | null>(null);

export const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = useLocalStorage<boolean>("exp-consent", false);
  const [url1, setUrl1] = useLocalStorage<string | null>("url1", null);
  const [url2, setUrl2] = useLocalStorage<string | null>("url2", null);
  const [userID, setUserID] = useLocalStorage<string | null>("userID", null);

  return (
    <ExperimentContext.Provider
      value={{
        consent,
        setConsent,
        url1,
        setUrl1,
        url2,
        setUrl2,
        userID,
        setUserID,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useExperimentContext = () => {
  const context = useContext(ExperimentContext);
  if (!context) throw new Error("useExperimentContext must be used within a ExperimentContextProvider");
  return context;
};
